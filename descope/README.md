# xmcp Descope Template

An authenticated MCP server using Descope for OAuth/JWT-based authentication.

## Features

- Descope JWT verification via OIDC discovery
- Session data accessible in tools via `getSession()`
- OAuth discovery endpoints auto-registered
- Example tools: `greet`, `whoami`, `github-repos`
- HTTP transport with middleware-based auth

## Getting Started

### Prerequisites

You need a [Descope](https://descope.com) project with:
- An Agentic Identity Hub MCP Server resource (Console → Agentic Identity Hub → Resources → Create Resource → MCP Server) — this gives you the Issuer URL for `DESCOPE_ISSUER_URL`, shaped like `https://api.descope.com/v1/apps/agentic/<project-id>/<mcp-server-id>`
- No client ID or secret needed — unlike Auth0's M2M app model, Descope verifies JWTs directly against your project's JWKS, with no client credentials involved
- (Optional) A Management Key, if your tools need to call Descope's Management APIs (e.g. looking up user details beyond what's in the session) — Console → Project Settings → Management Keys

### 1. Create the project

```bash
npx create-xmcp-app --example descope
```

### 2. Environment setup

```bash
cp .env.example .env
```

Edit `.env` with your Descope credentials:

```bash
DESCOPE_ISSUER_URL=https://api.descope.com/v1/apps/agentic/<project-id>/<mcp-server-id>
BASE_URL=http://127.0.0.1:3001/mcp
```

### 3. Install & run

```bash
pnpm install
pnpm dev
```

## How It Works

1. MCP clients send requests with `Authorization: Bearer <token>` header
2. The middleware verifies the JWT using Descope's JWKS endpoint, discovered via `DESCOPE_ISSUER_URL/.well-known/openid-configuration`
3. Valid sessions are stored in AsyncLocalStorage context
4. Tools access session data via `getSession()`

## Using Descope Data in Tools

### Session data — `whoami`

```typescript
import { getSession } from "@xmcp-dev/descope";

export default function myTool() {
  const session = getSession();

  console.log(session.userId);      // User ID
  console.log(session.email);       // User email
  console.log(session.roles);       // Assigned roles
  console.log(session.permissions); // Assigned permissions
  console.log(session.expiresAt);   // Token expiration

  return `Hello ${session.email}!`;
}
```

The `whoami` tool in `src/tools/whoami.ts` uses this to return the full authenticated session.

### Connection tokens — `github-repos`

```typescript
import { fetchConnectionToken } from "@xmcp-dev/descope";

export default async function githubRepos(): Promise<string> {
  const accessToken = await fetchConnectionToken("github");

  const response = await fetch("https://api.github.com/user/repos", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const repos = await response.json();
  return JSON.stringify(repos, null, 2);
}
```

The `github-repos` tool in `src/tools/github-repos.ts` uses `fetchConnectionToken()` to pull a stored OAuth access token from the Descope Connections Vault and call the GitHub API on the user's behalf.

> **Requires setup in the Descope Console:** `fetchConnectionToken("github")` only works if a GitHub Connection has been configured for this project under **Descope Console → Agentic Identity Hub → Connections Library → GitHub**, with the connection ID set to `"github"` (matching the string passed to `fetchConnectionToken`). Without that Connection configured, this call will fail at runtime — even with a fully valid, authenticated session — since there's no stored token for Descope to vend.

## OAuth Endpoints

The plugin automatically registers:

- `GET /.well-known/oauth-protected-resource` — Resource server metadata
- `GET /.well-known/oauth-authorization-server` — Authorization server metadata

## Deploy

```bash
pnpm build
node dist/http.js
```

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [Descope Documentation](https://docs.descope.com)
- [Descope Console](https://app.descope.com)
