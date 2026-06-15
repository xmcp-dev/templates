# xmcp Scalekit Template

An authenticated MCP server using Scalekit for per-user and per-organization access. Ideal for B2B organizations (your customers) who want to connect to a shared MCP server URL with individual sign-in and data isolation.

## Features

- Official `@xmcp-dev/scalekit` plugin for Scalekit OAuth 2.1
- Per-user and per-organization session via `getSession()`
- RBAC support using permissions from the access token
- Example tools demonstrating isolation: `whoami`, `save_note`, `list_my_notes`
- HTTP transport with automatic OAuth discovery endpoints
- Works with Cursor, Claude Code, Claude Desktop, and other MCP clients

## Getting Started

### Prerequisites

You need a [Scalekit](https://scalekit.com) account with:
- An MCP server resource registered in the dashboard
- Dynamic Client Registration enabled

### 1. Create the project

```bash
npx create-xmcp-app --example scalekit
```

### 2. Environment setup

```bash
cp .env.example .env
```

Edit `.env` with your Scalekit credentials:

```bash
SCALEKIT_ENVIRONMENT_URL=https://your-env.scalekit.com
SCALEKIT_CLIENT_ID=skc_...
SCALEKIT_CLIENT_SECRET=skcs_...
SCALEKIT_RESOURCE_ID=res_...
BASE_URL=http://127.0.0.1:3001
```

### 3. Install & run

```bash
pnpm install
pnpm dev
```

The server starts at `http://localhost:3001/mcp`.

## How It Works

1. MCP clients send requests with `Authorization: Bearer <token>` header
2. The Scalekit middleware verifies the JWT using Scalekit's JWKS
3. Valid sessions (including organization context) are available via `getSession()`
4. Tools scope data by `userId` and optionally enforce permissions

## Using Session Data in Tools

```typescript
import { getSession, getClient } from "@xmcp-dev/scalekit";

export default function myTool() {
  const session = getSession();

  console.log(session.userId);           // Unique user identifier
  console.log(session.organizationId);   // Organization / customer context
  console.log(session.permissions);      // RBAC permissions if configured
  console.log(session.scopes);

  // Access full Scalekit client for advanced calls if needed
  const client = getClient();

  return `Hello from ${session.organizationId || 'unknown org'}!`;
}
```

## RBAC with Permissions (Optional)

Scalekit can include `permissions` in the token. Enforce them in tools:

```typescript
import { getSession } from "@xmcp-dev/scalekit";

export default function saveNote({ content }: { content: string }) {
  const session = getSession();

  if (!session.permissions?.includes("notes:write")) {
    return "Missing notes:write permission.";
  }

  // ... save logic scoped to session.userId and session.organizationId
}
```

## Organization Isolation Example

The included "team notes" tools (`save_note`, `list_my_notes`) demonstrate the pattern using a simple per-user store. In real B2B use cases, different organizations connect to the same URL and see only their own data.

See the verification steps in the Scalekit integration guide for a full multi-organization test.

## OAuth Endpoints

The plugin automatically registers:

- `GET /.well-known/oauth-protected-resource`
- `GET /.well-known/oauth-authorization-server`

## Deploy

```bash
pnpm build
node dist/http.js
```

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [Scalekit Integration Guide](https://xmcp.dev/docs/integrations/scalekit)
- [Scalekit MCP Auth Quickstart](https://docs.scalekit.com/authenticate/mcp/quickstart)
