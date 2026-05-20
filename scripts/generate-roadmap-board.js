#!/usr/bin/env node

/**
 * Parses docs/roadmap/*.md and generates a kanban-style board at docs/roadmap/board.html
 * Cards are clickable — a modal shows the full rendered roadmap content.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR   = join(__dirname, '..');
const ROADMAP_DIR = join(ROOT_DIR, 'docs', 'roadmap');
const IDEAS_DIR   = join(ROOT_DIR, 'docs', 'ideas');

async function readAppName() {
  try {
    const env = await readFile(join(ROOT_DIR, '.env.example'), 'utf-8');
    const match = env.match(/^APP_NAME\s*=\s*(.+)$/m);
    if (match) return match[1].trim();
  } catch {}
  try {
    const pkg = JSON.parse(await readFile(join(ROOT_DIR, 'package.json'), 'utf-8'));
    if (pkg.name) return pkg.name;
  } catch {}
  return 'Project';
}

// ---------------------------------------------------------------------------
// HTML escaping (used for card titles/descriptions, not modal content)
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Frontmatter / status extraction
// ---------------------------------------------------------------------------

function extractStatus(content) {
  const frontmatterMatches = content.matchAll(/^---\s*\n([\s\S]*?)\n---/gm);
  for (const match of frontmatterMatches) {
    const statusMatch = match[1].match(/^status:\s*(.+)$/m);
    if (statusMatch) return statusMatch[1].trim().toLowerCase();
  }
  const boldMatch = content.match(/\*\*Status:\*\*\s*(.+)/i);
  if (boldMatch) return boldMatch[1].trim().toLowerCase();
  const headingMatch = content.match(/^##\s*Status:\s*(.+)$/mi);
  if (headingMatch) return headingMatch[1].trim().toLowerCase();
  const blockquoteMatch = content.match(/>\s*\*\*Status:\*\*\s*(.+)/i);
  if (blockquoteMatch) return blockquoteMatch[1].trim().toLowerCase();
  return 'unknown';
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

function extractDescription(content) {
  const lines = content.split('\n');
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) { foundTitle = true; continue; }
    if (!foundTitle) continue;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('---') ||
        trimmed.startsWith('**Status') || trimmed.startsWith('> **Status') ||
        trimmed.startsWith('**Date') || trimmed.startsWith('**Priority')) continue;
    return trimmed.length > 120 ? trimmed.slice(0, 117) + '...' : trimmed;
  }
  return '';
}

function extractFrontmatterField(content, field) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/m);
  if (!frontmatterMatch) return null;
  const match = frontmatterMatch[1].match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim() : null;
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function normalizeStatus(status) {
  if (['completed', 'done'].includes(status)) return 'completed';
  if (['proposal', 'idea'].includes(status)) return 'proposal';
  if (['draft'].includes(status)) return 'draft';
  if (['in-progress', 'in_progress', 'wip'].includes(status)) return 'in-progress';
  if (['reverted'].includes(status)) return 'reverted';
  if (['cancelled', 'canceled', 'discarded', 'wontfix', "won't fix", 'archived'].includes(status)) return 'cancelled';
  return 'unknown';
}

// ---------------------------------------------------------------------------
// Board config
// ---------------------------------------------------------------------------

const STATUS_CONFIG = {
  'draft':       { label: 'Draft',           color: '#f65cdc', bg: '#f5f3ff', border: '#ddd6fe' },
  'proposal':    { label: 'Proposal / Idea', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe' },
  'in-progress': { label: 'In Progress',     color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  'completed':   { label: 'Completed',       color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
  'reverted':    { label: 'Reverted',        color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  'cancelled':   { label: 'Cancelled',       color: '#475569', bg: '#f8fafc', border: '#94a3b8' },
  'unknown':     { label: 'No Status',       color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
};

const COLUMN_ORDER = ['draft', 'proposal', 'in-progress', 'completed', 'reverted', 'cancelled', 'unknown'];

// ---------------------------------------------------------------------------
// Ideas page generator
// ---------------------------------------------------------------------------

async function generateIdeasPage(appName) {
  const files = (await readdir(IDEAS_DIR)).filter(f => f.endsWith('.md'));
  const ideas = [];

  for (const file of files) {
    const content = await readFile(join(IDEAS_DIR, file), 'utf-8');
    const dateStr = extractFrontmatterField(content, 'date');
    const tagsStr = extractFrontmatterField(content, 'tags');
    const tags = tagsStr ? tagsStr.replace(/[\[\]]/g, '').split(',').map(t => t.trim()).filter(Boolean) : [];
    ideas.push({
      file,
      title: extractTitle(content),
      description: extractDescription(content),
      dateStr,
      tags,
      rawContent: content,
    });
  }

  // Sort newest first; files without a date sink to the bottom
  ideas.sort((a, b) => {
    if (!a.dateStr && !b.dateStr) return 0;
    if (!a.dateStr) return 1;
    if (!b.dateStr) return -1;
    return b.dateStr.localeCompare(a.dateStr);
  });

  const contentJson = JSON.stringify(
    Object.fromEntries(ideas.map(i => [i.file, i.rawContent]))
  ).replace(/<\/script>/gi, '<\\/script>');

  const cards = ideas.map(idea => {
    const dateLabel = idea.dateStr ? formatDate(idea.dateStr) : null;
    const tagBadges = idea.tags.map(t =>
      `<span style="display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;font-size:11px;padding:2px 8px;border-radius:10px;margin:2px 2px 0 0">${escapeHtml(t)}</span>`
    ).join('');
    return `  <div class="idea-card" data-file="${escapeHtml(idea.file)}" onclick="openModal(this.dataset.file)">
    <div class="idea-title">${escapeHtml(idea.title)}</div>
    ${idea.description ? `<div class="idea-desc">${escapeHtml(idea.description)}</div>` : ''}
    <div class="idea-meta">
      ${dateLabel ? `<span class="idea-date">${escapeHtml(dateLabel)}</span>` : ''}
      <div class="idea-tags">${tagBadges}</div>
    </div>
    <div class="idea-file">${escapeHtml(idea.file)}</div>
  </div>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SpeakPath — Ideas</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f1f5f9;
    color: #1e293b;
    padding: 24px;
    min-height: 100vh;
  }
  .header {
    text-align: center;
    margin-bottom: 32px;
  }
  .back-link {
    display: inline-block;
    font-size: 13px;
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid #c7d2fe;
    background: #eef2ff;
    margin-bottom: 16px;
    transition: background 0.15s;
  }
  .back-link:hover { background: #e0e7ff; }
  .header h1 { font-size: 24px; font-weight: 700; margin-bottom: 6px; }
  .header .stats { font-size: 14px; color: #64748b; }
  .ideas-list {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .idea-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px 18px;
    cursor: pointer;
    transition: box-shadow 0.15s, transform 0.1s;
    user-select: none;
  }
  .idea-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    transform: translateY(-1px);
  }
  .idea-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #0f172a;
  }
  .idea-desc {
    font-size: 13px;
    color: #475569;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  .idea-meta {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex-wrap: wrap;
  }
  .idea-date {
    font-size: 12px;
    color: #94a3b8;
    white-space: nowrap;
    margin-top: 4px;
  }
  .idea-tags { flex: 1; }
  .idea-file {
    font-size: 11px;
    color: #cbd5e1;
    margin-top: 8px;
    font-family: monospace;
  }
  .generated {
    text-align: center;
    margin-top: 32px;
    font-size: 12px;
    color: #94a3b8;
  }

  /* Modal */
  #modal-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(2px);
    z-index: 100;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  #modal-backdrop.open { display: flex; }
  #modal {
    background: #fff;
    border-radius: 14px;
    width: 100%;
    max-width: 780px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 24px 64px rgba(0,0,0,0.18);
    overflow: hidden;
    animation: modal-in 0.18s ease;
  }
  @keyframes modal-in {
    from { opacity: 0; transform: scale(0.97) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  #modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
  }
  #modal-filename { font-size: 12px; color: #94a3b8; font-family: monospace; }
  #modal-close {
    width: 30px; height: 30px;
    border-radius: 50%; border: none;
    background: #f1f5f9; color: #64748b;
    font-size: 18px; line-height: 1;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; flex-shrink: 0;
  }
  #modal-close:hover { background: #e2e8f0; color: #1e293b; }
  #modal-body { overflow-y: auto; padding: 24px 28px; flex: 1; }
  #modal-body h1 { font-size: 20px; font-weight: 700; margin: 0 0 16px; color: #0f172a; }
  #modal-body h2 { font-size: 16px; font-weight: 700; margin: 24px 0 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
  #modal-body h3 { font-size: 14px; font-weight: 600; margin: 18px 0 8px; color: #1e293b; }
  #modal-body p  { font-size: 14px; line-height: 1.6; margin: 0 0 12px; color: #334155; }
  #modal-body a  { color: #6366f1; text-decoration: underline; }
  #modal-body hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  #modal-body ul, #modal-body ol { font-size: 14px; line-height: 1.6; margin: 0 0 12px 20px; color: #334155; }
  #modal-body li { margin-bottom: 4px; }
  #modal-body blockquote {
    border-left: 3px solid #c7d2fe; background: #eef2ff;
    padding: 10px 14px; border-radius: 0 6px 6px 0;
    margin: 0 0 12px; color: #4338ca; font-size: 14px;
  }
  #modal-body code {
    background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px;
    padding: 1px 5px; font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 12px; color: #be185d;
  }
  #modal-body pre {
    background: #0f172a; border-radius: 8px;
    padding: 14px 16px; overflow-x: auto; margin: 0 0 14px;
  }
  #modal-body pre code { background: none; border: none; padding: 0; color: #e2e8f0; font-size: 13px; }
  #modal-body strong { font-weight: 600; color: #0f172a; }
</style>
</head>
<body>

<div id="modal-backdrop">
  <div id="modal">
    <div id="modal-header">
      <span id="modal-filename"></span>
      <button id="modal-close" title="Close (Esc)">&#x2715;</button>
    </div>
    <div id="modal-body"></div>
  </div>
</div>

<div class="header">
  <div><a href="../roadmap/board.html" class="back-link">&#8592; Roadmap Board</a></div>
  <h1>&#128161; Ideas</h1>
  <div class="stats">${ideas.length} idea${ideas.length !== 1 ? 's' : ''} &middot; sorted by date</div>
</div>

<div class="ideas-list">
${cards}
</div>

<div class="generated">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>

<script>
const IDEAS_MD = ${contentJson};

const backdrop = document.getElementById('modal-backdrop');
const modalBody = document.getElementById('modal-body');
const modalFilename = document.getElementById('modal-filename');

function openModal(file) {
  modalFilename.textContent = file;
  const md = IDEAS_MD[file];
  if (!md) {
    modalBody.innerHTML = '<p>Content not found.</p>';
  } else {
    try {
      modalBody.innerHTML = marked.parse(md);
    } catch(e) {
      modalBody.innerHTML = '<pre style="white-space:pre-wrap;font-size:13px">' + md.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</pre>';
    }
  }
  modalBody.scrollTop = 0;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.idea-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.file));
});

document.getElementById('modal-close').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
</script>
</body>
</html>`;

  const outPath = join(IDEAS_DIR, 'ideas.html');
  await writeFile(outPath, html, 'utf-8');
  console.log(`Ideas page generated → ${outPath}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const appName = await readAppName();
  const files = (await readdir(ROADMAP_DIR)).filter(f => f.endsWith('.md') && f !== 'board.md');
  const items = [];

  for (const file of files) {
    const content = await readFile(join(ROADMAP_DIR, file), 'utf-8');
    const rawStatus = extractStatus(content);
    const normalStatus = normalizeStatus(rawStatus);
    const completedDate = extractFrontmatterField(content, 'completed');
    const createdDate = extractFrontmatterField(content, 'created');
    const sortDate = normalStatus === 'completed' ? (completedDate || createdDate) : createdDate;
    items.push({
      file,
      title: extractTitle(content),
      description: extractDescription(content),
      status: normalStatus,
      rawStatus,
      rawContent: content,
      completedDate,
      createdDate,
      sortDate,
    });
  }

  // Group by status
  const columns = {};
  for (const col of COLUMN_ORDER) columns[col] = [];
  for (const item of items) columns[item.status].push(item);

  // Sort each column newest → oldest; items without a date sink to the bottom
  for (const col of COLUMN_ORDER) {
    columns[col].sort((a, b) => {
      if (!a.sortDate && !b.sortDate) return 0;
      if (!a.sortDate) return 1;
      if (!b.sortDate) return -1;
      return b.sortDate.localeCompare(a.sortDate);
    });
  }

  const total = items.length;
  const completedCount = columns['completed'].length;
  const activeTotal = total - columns['cancelled'].length - columns['reverted'].length;

  // Embed raw markdown as JSON — escape </script> to avoid breaking the script tag
  // Raw markdown is ~60% smaller than pre-rendered HTML; marked.js renders on click
  const contentJson = JSON.stringify(
    Object.fromEntries(items.map(item => [item.file, item.rawContent]))
  ).replace(/<\/script>/gi, '<\\/script>');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SpeakPath — Roadmap Board</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; color: #1e293b; padding: 24px; min-height: 100vh; }
  .header { text-align: center; margin-bottom: 32px; }
  .header h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
  .header .stats { font-size: 14px; color: #64748b; }
  .progress-bar { max-width: 400px; margin: 12px auto 0; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
  .progress-bar .fill { height: 100%; background: #10b981; border-radius: 4px; }
  .board { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; align-items: flex-start; }
  .column { min-width: 260px; flex: 1; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
  .column-header { padding: 14px 16px; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #e2e8f0; }
  .column-header .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .column-header .count { margin-left: auto; background: #f1f5f9; color: #64748b; font-size: 12px; font-weight: 500; padding: 2px 8px; border-radius: 10px; }
  .column-body { padding: 8px; display: flex; flex-direction: column; gap: 8px; }
  .card { padding: 12px; border-radius: 8px; border: 1px solid; cursor: pointer; transition: box-shadow 0.15s, transform 0.1s; user-select: none; }
  .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-1px); }
  .card-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; line-height: 1.4; pointer-events: none; }
  .card-desc { font-size: 12px; color: #64748b; line-height: 1.4; pointer-events: none; }
  .card-file { font-size: 11px; color: #94a3b8; margin-top: 6px; font-family: monospace; pointer-events: none; }
  .card-date { font-size: 11px; color: #94a3b8; margin-top: 6px; pointer-events: none; }
  .status-summary { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-top: 16px; }
  .status-pill { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; padding: 4px 12px; border-radius: 20px; border: 1px solid; }
  .status-pill .pill-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .status-pill .pill-count { font-weight: 700; }
  .generated { text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8; }

  /* ── Native dialog popup ── */
  dialog:not([open]) { display: none; }
  dialog[open] {
    border: none;
    border-radius: 14px;
    padding: 0;
    width: 90vw;
    max-width: 780px;
    max-height: 85vh;
    box-shadow: 0 24px 64px rgba(0,0,0,0.22);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  dialog::backdrop { background: rgba(15,23,42,0.55); backdrop-filter: blur(2px); }
  .dlg-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
  .dlg-fname { font-size: 12px; color: #94a3b8; font-family: monospace; }
  .dlg-close { width: 30px; height: 30px; border-radius: 50%; border: none; background: #f1f5f9; color: #64748b; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .dlg-close:hover { background: #e2e8f0; color: #1e293b; }
  .dlg-body { overflow-y: auto; padding: 24px 28px; flex: 1; }
  .dlg-body pre { white-space: pre-wrap; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; line-height: 1.6; color: #334155; }
</style>
</head>
<body>

<dialog id="doc-dialog">
  <div class="dlg-header">
    <span class="dlg-fname" id="dlg-fname"></span>
    <button class="dlg-close" onclick="document.getElementById('doc-dialog').close()">&#x2715;</button>
  </div>
  <div class="dlg-body">
    <pre id="dlg-content"></pre>
  </div>
</dialog>

<div class="header">
  <h1>${escapeHtml(appName)} Roadmap</h1>
  <div class="stats">${total} items &middot; ${completedCount} completed (${activeTotal ? Math.round(completedCount / activeTotal * 100) : 0}%)</div>
  <div class="progress-bar"><div class="fill" style="width: ${activeTotal ? Math.round(completedCount / activeTotal * 100) : 0}%"></div></div>
  <div style="margin-top:14px"><a href="../ideas/ideas.html" style="font-size:13px;color:#6366f1;text-decoration:none;font-weight:500;padding:6px 14px;border-radius:20px;border:1px solid #c7d2fe;background:#eef2ff;">&#128161; Ideas</a></div>
  <div class="status-summary">
${COLUMN_ORDER.filter(col => columns[col].length > 0).map(col => {
  const cfg = STATUS_CONFIG[col];
  return `    <div class="status-pill" style="background: ${cfg.bg}; border-color: ${cfg.border}; color: ${cfg.color}">
      <span class="pill-dot" style="background: ${cfg.color}"></span>
      ${cfg.label}: <span class="pill-count">${columns[col].length}</span>
    </div>`;
}).join('\n')}
  </div>
</div>
<div class="board">
${COLUMN_ORDER.filter(col => columns[col].length > 0).map(col => {
  const cfg = STATUS_CONFIG[col];
  const cards = columns[col];
  return `  <div class="column">
    <div class="column-header">
      <span class="dot" style="background: ${cfg.color}"></span>
      ${cfg.label}
      <span class="count">${cards.length}</span>
    </div>
    <div class="column-body">
${cards.map(item => {
  const isCompleted = col === 'completed';
  const dateLabel = isCompleted
    ? (item.completedDate ? `Completed ${formatDate(item.completedDate)}` : (item.createdDate ? `Created ${formatDate(item.createdDate)}` : null))
    : (item.createdDate ? `Created ${formatDate(item.createdDate)}` : null);
  return `      <div class="card" style="background: ${cfg.bg}; border-color: ${cfg.border}" onclick="showDoc('${item.file.replace(/'/g, "\\'")}')">
        <div class="card-title">${escapeHtml(item.title)}</div>
        ${item.description ? `<div class="card-desc">${escapeHtml(item.description)}</div>` : ''}
        ${dateLabel ? `<div class="card-date">${escapeHtml(dateLabel)}</div>` : ''}
        <div class="card-file">${escapeHtml(item.file)}</div>
      </div>`;
}).join('\n')}
    </div>
  </div>`;
}).join('\n')}
</div>
<div class="generated">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>

<script>
var DOCS = ${contentJson};
function showDoc(file) {
  document.getElementById('dlg-fname').textContent = file;
  document.getElementById('dlg-content').textContent = DOCS[file] || 'Content not found.';
  document.getElementById('doc-dialog').showModal();
}
document.getElementById('doc-dialog').addEventListener('click', function(e) {
  if (e.target === this) this.close();
});
</script>
</body>
</html>`;

  const outPath = join(ROADMAP_DIR, 'board.html');
  await writeFile(outPath, html, 'utf-8');
  console.log(`Roadmap board generated → ${outPath}`);

  await generateIdeasPage(appName);
}

main().catch(err => { console.error(err); process.exit(1); });
