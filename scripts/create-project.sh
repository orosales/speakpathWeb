#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# create-project.sh — Scaffold a new Node.js + React/Vite monorepo
#
# Usage:
#   bash scripts/create-project.sh <project-name> [target-dir]
#
# Examples:
#   bash scripts/create-project.sh my-app
#   bash scripts/create-project.sh my-app ~/projects
#
# Creates the same architecture as agentVoice:
#   - npm workspaces monorepo (server/ + client/)
#   - Express + WebSocket backend with TypeScript (NodeNext)
#   - React 19 + Vite frontend with TypeScript
#   - Playwright e2e tests with desktop/mobile viewports
#   - Prisma ORM with PostgreSQL
#   - JWT + Google OAuth auth scaffolding
#   - Dockerfile (multi-stage build)
#   - Fly.io deployment config
#   - .claude/ agents, skills, and hooks
#   - .env.example with all config vars
# ============================================================================

if [[ $# -lt 1 ]]; then
  echo "Usage: bash scripts/create-project.sh <project-name> [target-dir]"
  echo ""
  echo "  project-name   Name of the new project (lowercase, hyphens ok)"
  echo "  target-dir     Where to create it (default: current directory)"
  exit 1
fi

PROJECT_NAME="$1"
TARGET_DIR="${2:-.}"
PROJECT_DIR="$TARGET_DIR/$PROJECT_NAME"

# Validate project name
if [[ ! "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo "Error: Project name must start with a letter and contain only lowercase letters, numbers, and hyphens."
  exit 1
fi

if [[ -d "$PROJECT_DIR" ]]; then
  echo "Error: Directory '$PROJECT_DIR' already exists."
  exit 1
fi

echo "Creating project '$PROJECT_NAME' in $PROJECT_DIR ..."

# ── Helper ──────────────────────────────────────────────────────────────────
mkfile() {
  local filepath="$1"
  mkdir -p "$(dirname "$filepath")"
  cat > "$filepath"
}

# Convert project-name to PascalCase for display
DISPLAY_NAME=$(echo "$PROJECT_NAME" | sed -r 's/(^|-)(\w)/\U\2/g')

# ── Root ────────────────────────────────────────────────────────────────────
mkdir -p "$PROJECT_DIR"

mkfile "$PROJECT_DIR/package.json" <<EOF
{
  "name": "$PROJECT_NAME",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["server", "client"],
  "scripts": {
    "dev": "concurrently -n server,client -c blue,green \"npm run dev -w server\" \"npm run dev -w client\"",
    "build": "npm run build -w server && npm run build -w client",
    "test:e2e": "npx playwright test --config e2e/playwright.config.ts",
    "test:e2e:ui": "npx playwright test --config e2e/playwright.config.ts --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0",
    "concurrently": "^9.1.0",
    "typescript": "^5.7.0"
  }
}
EOF

mkfile "$PROJECT_DIR/.gitignore" <<'EOF'
node_modules/
dist/
.env
*.log
test-results/
playwright-report/
server/sessions/
.DS_Store
EOF

mkfile "$PROJECT_DIR/.env.example" <<EOF
# API Keys
# DEEPGRAM_API_KEY=your_deepgram_api_key
# OPENAI_API_KEY=your_openai_api_key

# Server
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/$PROJECT_NAME

# Auth
JWT_SECRET=replace_with_64_char_hex_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
APP_ORIGIN=http://localhost:5173

# App
DEFAULT_LANGUAGE=en
EOF

mkfile "$PROJECT_DIR/README.md" <<EOF
# $DISPLAY_NAME

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env

# Start dev servers (backend :3001, frontend :5173)
npm run dev

# Build for production
npm run build

# Run e2e tests
npm run test:e2e
\`\`\`

## Architecture

Monorepo with npm workspaces:

- **server/** — Express + WebSocket backend (TypeScript, NodeNext)
- **client/** — React 19 + Vite frontend (TypeScript)
- **e2e/** — Playwright end-to-end tests
- **scripts/** — Utility scripts

## Deployment

Deployed to Fly.io via multi-stage Dockerfile.

\`\`\`bash
fly deploy
\`\`\`
EOF

# ── Server ──────────────────────────────────────────────────────────────────
mkfile "$PROJECT_DIR/server/package.json" <<EOF
{
  "name": "$PROJECT_NAME-server",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@prisma/client": "^6.6.0",
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.4.0",
    "express": "^4.21.0",
    "express-rate-limit": "^8.1.0",
    "google-auth-library": "^10.1.0",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.2",
    "uuid": "^11.0.0",
    "ws": "^8.18.0"
  },
  "devDependencies": {
    "@types/cookie-parser": "^1.4.0",
    "@types/express": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/node": "^22.0.0",
    "@types/uuid": "^10.0.0",
    "@types/ws": "^8.5.0",
    "prisma": "^6.6.0",
    "tsx": "^4.19.0"
  }
}
EOF

mkfile "$PROJECT_DIR/server/tsconfig.json" <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

mkfile "$PROJECT_DIR/server/src/config.ts" <<'EOF'
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(import.meta.dirname, "../../.env") });

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3001/api/auth/google/callback",
  appOrigin: process.env.APP_ORIGIN || "http://localhost:5173",
  defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",
} as const;
EOF

mkfile "$PROJECT_DIR/server/src/index.ts" <<'EOF'
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { resolve } from "path";
import { config } from "./config.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Rate limiting
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// CORS for development
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === config.appOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Serve client in production
const clientDist = resolve(import.meta.dirname, "../../client/dist");
app.use(express.static(clientDist));
app.get("*", (_req, res, next) => {
  if (_req.path.startsWith("/api") || _req.path.startsWith("/ws")) {
    return next();
  }
  res.sendFile(resolve(clientDist, "index.html"));
});

// HTTP + WebSocket server
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      // Handle binary audio frames
      console.log(`Received ${(data as Buffer).length} bytes of audio`);
    } else {
      // Handle JSON control messages
      try {
        const message = JSON.parse(data.toString());
        console.log("Received message:", message);
      } catch {
        console.error("Invalid JSON message");
      }
    }
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
EOF

mkfile "$PROJECT_DIR/server/src/types/index.ts" <<'EOF'
// WebSocket message types — keep in sync with client/src/types/index.ts

export interface ClientMessage {
  type: "session:start" | "session:end";
  payload?: Record<string, unknown>;
}

export interface ServerMessage {
  type: "session:started" | "session:ended" | "error";
  payload?: Record<string, unknown>;
}
EOF

mkfile "$PROJECT_DIR/server/src/types/express.d.ts" <<'EOF'
import "express";

declare module "express" {
  interface Request {
    userId?: string;
  }
}
EOF

mkfile "$PROJECT_DIR/server/src/websocket/messageProtocol.ts" <<'EOF'
import type { ClientMessage, ServerMessage } from "../types/index.js";

export function parseClientMessage(data: string): ClientMessage | null {
  try {
    const parsed = JSON.parse(data);
    if (parsed && typeof parsed.type === "string") {
      return parsed as ClientMessage;
    }
    return null;
  } catch {
    return null;
  }
}

export function serializeServerMessage(message: ServerMessage): string {
  return JSON.stringify(message);
}
EOF

# Prisma schema
mkfile "$PROJECT_DIR/server/prisma/schema.prisma" <<EOF
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
}

model User {
  id              String         @id @default(uuid())
  email           String         @unique
  displayName     String?
  avatarUrl       String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  authProviders   AuthProvider[]
  refreshTokens   RefreshToken[]
}

model AuthProvider {
  id          String   @id @default(uuid())
  provider    String
  providerId  String
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())

  @@unique([provider, providerId])
}

model RefreshToken {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tokenHash String   @unique
  familyId  String
  revoked   Boolean  @default(false)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([familyId])
  @@index([expiresAt])
}
EOF

mkdir -p "$PROJECT_DIR/server/sessions"
touch "$PROJECT_DIR/server/sessions/.gitkeep"

# ── Client ──────────────────────────────────────────────────────────────────
mkfile "$PROJECT_DIR/client/package.json" <<EOF
{
  "name": "$PROJECT_NAME-client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0"
  }
}
EOF

mkfile "$PROJECT_DIR/client/tsconfig.json" <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  "include": ["src"]
}
EOF

mkfile "$PROJECT_DIR/client/vite.config.ts" <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:3001", changeOrigin: true },
      "/ws": { target: "ws://localhost:3001", ws: true },
    },
  },
});
EOF

mkfile "$PROJECT_DIR/client/index.html" <<EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$DISPLAY_NAME</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

mkfile "$PROJECT_DIR/client/src/main.tsx" <<'EOF'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
EOF

mkfile "$PROJECT_DIR/client/src/App.tsx" <<EOF
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to connect to server"));
  }, []);

  return (
    <div className="app">
      <h1>$DISPLAY_NAME</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default App;
EOF

mkfile "$PROJECT_DIR/client/src/App.css" <<'EOF'
:root {
  --bg: #0a0a0a;
  --fg: #ededed;
  --accent: #3b82f6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--fg);
  min-height: 100vh;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

p {
  color: #888;
  font-size: 1.1rem;
}
EOF

mkfile "$PROJECT_DIR/client/src/types/index.ts" <<'EOF'
// WebSocket message types — keep in sync with server/src/types/index.ts

export interface ClientMessage {
  type: "session:start" | "session:end";
  payload?: Record<string, unknown>;
}

export interface ServerMessage {
  type: "session:started" | "session:ended" | "error";
  payload?: Record<string, unknown>;
}
EOF

mkfile "$PROJECT_DIR/client/src/services/messageProtocol.ts" <<'EOF'
import type { ClientMessage, ServerMessage } from "../types/index.ts";

export function serializeClientMessage(message: ClientMessage): string {
  return JSON.stringify(message);
}

export function parseServerMessage(data: string): ServerMessage | null {
  try {
    const parsed = JSON.parse(data);
    if (parsed && typeof parsed.type === "string") {
      return parsed as ServerMessage;
    }
    return null;
  } catch {
    return null;
  }
}
EOF

mkdir -p "$PROJECT_DIR/client/public"
touch "$PROJECT_DIR/client/public/.gitkeep"

# ── E2E Tests ───────────────────────────────────────────────────────────────
mkfile "$PROJECT_DIR/e2e/playwright.config.ts" <<'EOF'
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev -w client -- --host 127.0.0.1 --port 5173",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    cwd: "..",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 720 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 667 } } },
  ],
});
EOF

mkfile "$PROJECT_DIR/e2e/helpers/app-ready.ts" <<'EOF'
import { type Page, expect } from "@playwright/test";

export async function gotoApp(page: Page) {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
}

export async function ensureAppReady(page: Page) {
  await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
}
EOF

mkfile "$PROJECT_DIR/e2e/tests/app-load.spec.ts" <<EOF
import { test, expect } from "@playwright/test";
import { gotoApp } from "../helpers/app-ready.ts";

test.describe("App Load", () => {
  test("should display the app title", async ({ page }) => {
    await gotoApp(page);
    await expect(page.locator("h1")).toHaveText("$DISPLAY_NAME");
  });

  test("should show server message", async ({ page }) => {
    await gotoApp(page);
    await expect(page.locator("p")).not.toHaveText("Loading...", { timeout: 5000 });
  });
});
EOF

mkfile "$PROJECT_DIR/e2e/fixtures/websocket.fixture.ts" <<'EOF'
import { type Page } from "@playwright/test";

export async function mockWebSocket(page: Page) {
  await page.addInitScript(() => {
    const OriginalWebSocket = window.WebSocket;
    (window as any).__mockWS = null;

    class MockWebSocket extends EventTarget {
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;

      readyState = MockWebSocket.OPEN;
      url: string;

      constructor(url: string) {
        super();
        this.url = url;
        (window as any).__mockWS = this;
        setTimeout(() => {
          this.dispatchEvent(new Event("open"));
        }, 0);
      }

      send(_data: unknown) {}
      close() {
        this.readyState = MockWebSocket.CLOSED;
        this.dispatchEvent(new CloseEvent("close"));
      }
    }

    (window as any).WebSocket = MockWebSocket;
  });
}
EOF

# ── Dockerfile ──────────────────────────────────────────────────────────────
mkfile "$PROJECT_DIR/Dockerfile" <<'EOF'
# --- Build stage ---
FROM node:20-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/

RUN npm install

# Build server
COPY server/tsconfig.json ./server/
COPY server/src/ ./server/src/
RUN npm run build --workspace=server

# Build client
COPY client/tsconfig.json ./client/
COPY client/vite.config.ts client/index.html ./client/
COPY client/src/ ./client/src/
COPY client/public/ ./client/public/
RUN npm run build --workspace=client

# --- Production stage ---
FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/

RUN npm install --workspace=server --omit=dev

# Prisma
COPY server/prisma ./server/prisma
RUN npx prisma generate --schema server/prisma/schema.prisma

COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist

EXPOSE 8080

CMD ["node", "server/dist/index.js"]
EOF

mkfile "$PROJECT_DIR/fly.toml" <<EOF
app = "$PROJECT_NAME"
primary_region = "iad"

[build]

[env]
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 0

  [http_service.concurrency]
    type = "connections"
    hard_limit = 250
    soft_limit = 200

[[http_service.checks]]
  grace_period = "10s"
  interval = "30s"
  method = "GET"
  path = "/health"
  timeout = "5s"

[[vm]]
  size = "shared-cpu-1x"
  memory = "256mb"
EOF

# ── CLAUDE.md ───────────────────────────────────────────────────────────────
mkfile "$PROJECT_DIR/CLAUDE.md" <<EOF
# CLAUDE.md

## Commands

\`\`\`bash
# Install dependencies (npm workspaces: root, server, client)
npm install

# Start dev servers (backend on :3001, frontend on :5173)
npm run dev

# Build for production (server tsc + client vite)
npm run build

# Run all Playwright e2e tests
npm run test:e2e

# Run a single e2e test file
npx playwright test --config e2e/playwright.config.ts e2e/tests/app-load.spec.ts

# Type-check server
npm run build -w server -- --noEmit
\`\`\`

## Architecture

Monorepo with npm workspaces: \`server/\` (Express + WebSocket) and \`client/\` (React 19 + Vite).

### Server (server/src/)
- **index.ts** — Express app, WebSocket server, health check
- **config.ts** — Environment variables and defaults
- **types/** — Shared WebSocket message types
- **websocket/** — Message protocol parsing/serialization

### Client (client/src/)
- **App.tsx** — Root component
- **types/** — WebSocket message types (mirrors server)
- **services/** — Message protocol (mirrors server)

### E2E Tests (e2e/)
Playwright tests with desktop (1280x720) and mobile (375x667) viewports.

## Key Details
- **Monorepo**: npm workspaces with \`server/\` and \`client/\`
- **TypeScript**: Server uses NodeNext module resolution with \`.js\` extensions in imports
- **Deployment**: Fly.io via Dockerfile. Production serves client from \`client/dist/\` through Express
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT + Google OAuth scaffolding
- **Environment**: See \`.env.example\` for required variables
EOF

# ── .claude settings ────────────────────────────────────────────────────────
mkfile "$PROJECT_DIR/.claude/settings.json" <<'EOF'
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && npx tsc --noEmit 2>&1 | grep -E 'error TS' | head -5",
            "async": true,
            "timeout": 20
          }
        ]
      }
    ]
  }
}
EOF

# ── Scripts ─────────────────────────────────────────────────────────────────
mkdir -p "$PROJECT_DIR/scripts"

# ── Docs ────────────────────────────────────────────────────────────────────
mkdir -p "$PROJECT_DIR/docs/decisions"
mkdir -p "$PROJECT_DIR/docs/plans"

# ── Test results (gitignored) ──────────────────────────────────────────────
mkdir -p "$PROJECT_DIR/test-results"

# ── Done ────────────────────────────────────────────────────────────────────
echo ""
echo "Project '$PROJECT_NAME' created successfully!"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_DIR"
echo "  git init"
echo "  cp .env.example .env    # Configure your environment"
echo "  npm install"
echo "  npx playwright install  # For e2e tests"
echo "  npm run dev             # Start developing!"
echo ""
