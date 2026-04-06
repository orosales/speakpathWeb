#!/usr/bin/env node

/**
 * Parses docs/roadmap/*.md and generates a kanban-style board at docs/roadmap/board.html
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROADMAP_DIR = join(__dirname, '..', 'docs', 'roadmap');

function extractStatus(content) {
  // Format 1: YAML frontmatter  ---\nstatus: completed\n---  (at start of file or after title)
  const frontmatterMatches = content.matchAll(/^---\s*\n([\s\S]*?)\n---/gm);
  for (const match of frontmatterMatches) {
    const statusMatch = match[1].match(/^status:\s*(.+)$/m);
    if (statusMatch) return statusMatch[1].trim().toLowerCase();
  }

  // Format 2: **Status:** Done  (bold inline)
  const boldMatch = content.match(/\*\*Status:\*\*\s*(.+)/i);
  if (boldMatch) return boldMatch[1].trim().toLowerCase();

  // Format 3: ## Status: completed  (heading)
  const headingMatch = content.match(/^##\s*Status:\s*(.+)$/mi);
  if (headingMatch) return headingMatch[1].trim().toLowerCase();

  // Format 4: > **Status:** Idea  (blockquote)
  const blockquoteMatch = content.match(/>\s*\*\*Status:\*\*\s*(.+)/i);
  if (blockquoteMatch) return blockquoteMatch[1].trim().toLowerCase();

  return 'unknown';
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

function extractDescription(content) {
  // Grab first paragraph after the title (skip frontmatter, status lines, ---)
  const lines = content.split('\n');
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) { foundTitle = true; continue; }
    if (!foundTitle) continue;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('---') ||
        trimmed.startsWith('**Status') || trimmed.startsWith('> **Status') ||
        trimmed.startsWith('**Date') || trimmed.startsWith('**Priority')) continue;
    // Return first meaningful line, truncated
    return trimmed.length > 120 ? trimmed.slice(0, 117) + '...' : trimmed;
  }
  return '';
}

function normalizeStatus(status) {
  if (['completed', 'done'].includes(status)) return 'completed';
  if (['proposal', 'idea'].includes(status)) return 'proposal';
  if (['draft'].includes(status)) return 'draft';
  if (['in-progress', 'in_progress', 'wip'].includes(status)) return 'in-progress';
  if (['reverted'].includes(status)) return 'reverted';
  return 'unknown';
}

const STATUS_CONFIG = {
  'draft':       { label: 'Draft',           color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
  'proposal':    { label: 'Proposal / Idea', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe' },
  'in-progress': { label: 'In Progress',     color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  'completed':   { label: 'Completed',       color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
  'reverted':    { label: 'Reverted',        color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  'unknown':     { label: 'No Status',       color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
};

const COLUMN_ORDER = ['draft', 'proposal', 'in-progress', 'completed', 'reverted', 'unknown'];

async function main() {
  const files = (await readdir(ROADMAP_DIR)).filter(f => f.endsWith('.md') && f !== 'board.md');
  const items = [];

  for (const file of files) {
    const content = await readFile(join(ROADMAP_DIR, file), 'utf-8');
    const rawStatus = extractStatus(content);
    items.push({
      file,
      title: extractTitle(content),
      description: extractDescription(content),
      status: normalizeStatus(rawStatus),
      rawStatus,
    });
  }

  // Group by status
  const columns = {};
  for (const col of COLUMN_ORDER) columns[col] = [];
  for (const item of items) {
    columns[item.status].push(item);
  }

  // Count totals
  const total = items.length;
  const completedCount = columns['completed'].length;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Standflow — Roadmap Board</title>
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
  .header h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .header .stats {
    font-size: 14px;
    color: #64748b;
  }
  .progress-bar {
    max-width: 400px;
    margin: 12px auto 0;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-bar .fill {
    height: 100%;
    background: #10b981;
    border-radius: 4px;
    transition: width 0.3s;
  }
  .board {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 16px;
    align-items: flex-start;
  }
  .column {
    min-width: 260px;
    flex: 1;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }
  .column-header {
    padding: 14px 16px;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #e2e8f0;
  }
  .column-header .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .column-header .count {
    margin-left: auto;
    background: #f1f5f9;
    color: #64748b;
    font-size: 12px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 10px;
  }
  .column-body {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .card {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid;
    cursor: default;
    transition: box-shadow 0.15s;
  }
  .card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .card-title {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 4px;
    line-height: 1.4;
  }
  .card-desc {
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
  }
  .card-file {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 6px;
    font-family: monospace;
  }
  .empty {
    text-align: center;
    padding: 20px 12px;
    color: #94a3b8;
    font-size: 13px;
  }
  .status-summary {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 16px;
  }
  .status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid;
  }
  .status-pill .pill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .status-pill .pill-count {
    font-weight: 700;
  }
  .generated {
    text-align: center;
    margin-top: 24px;
    font-size: 12px;
    color: #94a3b8;
  }
</style>
</head>
<body>
<div class="header">
  <h1>Standflow Roadmap</h1>
  <div class="stats">${total} items &middot; ${completedCount} completed (${total ? Math.round(completedCount / total * 100) : 0}%)</div>
  <div class="progress-bar"><div class="fill" style="width: ${total ? Math.round(completedCount / total * 100) : 0}%"></div></div>
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
${cards.map(item => `      <div class="card" style="background: ${cfg.bg}; border-color: ${cfg.border}">
        <div class="card-title">${escapeHtml(item.title)}</div>
        ${item.description ? `<div class="card-desc">${escapeHtml(item.description)}</div>` : ''}
        <div class="card-file">${item.file}</div>
      </div>`).join('\n')}
    </div>
  </div>`;
}).join('\n')}
</div>
<div class="generated">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
</body>
</html>`;

  const outPath = join(ROADMAP_DIR, 'board.html');
  await writeFile(outPath, html, 'utf-8');
  console.log(`Roadmap board generated → ${outPath}`);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

main().catch(err => { console.error(err); process.exit(1); });
