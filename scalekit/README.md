# Scalekit

An authenticated MCP server using Scalekit for per-user team access. Teammates share one server URL; each person signs in individually through Scalekit and sees only their own data (with optional RBAC). 

This is the official template demonstrating the "roll out to a team" pattern for xmcp.

## The problem

Teams often run MCP servers (xmcp, FastMCP, or custom) whose tools call internal services or external integrations. When the shared MCP client config includes API keys, database URLs, or service tokens in `env`, every teammate inherits the **creator's** credentials.

## The fix

Share the **URL only** in MCP client config. Each teammate completes signup or login through Scalekit on first connect. Your server reads the JWT `sub` claim as the user ID and scopes tool data to that identity.

| Shared across the team | Per user |
|---|---|
| MCP server URL (`http://localhost:3001/mcp`) | Scalekit login identity (JWT `sub`) |
| Scalekit MCP server registration (in server `.env`) | Notes and tool data keyed by `sub` |

## What this demo does

- Serves an MCP server over Streamable HTTP at `/mcp`
- Validates Bearer tokens issued by Scalekit using JWKS
- Exposes OAuth discovery endpoints for MCP clients (Cursor, Claude Code, MCP Inspector)
- Provides per-user notes tools (`save_note`, `list_my_notes`) scoped by JWT `sub`
- Enforces RBAC permissions (`notes:read`, `notes:write`) when they appear in the access token
- Includes `whoami` to inspect the authenticated session, roles, and permissions

## Using this template

### 1. Create the project

```bash
npx create-xmcp-app@latest --example scalekit
cd scalekit-team-notes
```

Or clone directly:

```bash
git clone https://github.com/xmcp-dev/templates/tree/main/scalekit-team-notes
cd scalekit-team-notes
```

### 2. Register your MCP server in Scalekit

Follow the [MCP Auth quickstart](https://docs.scalekit.com/authenticate/mcp/quickstart/):

1. Go to [Scalekit Dashboard](https://app.scalekit.com) → **MCP Servers** → **Add MCP server**
2. Set **Server URL** to `http://localhost:3001` (update for production)
3. Enable **Allow dynamic client registration** (required for Cursor, Claude Code, etc.)
4. Note the **Resource ID** (`res_...`)
5. Copy **Environment URL**, **Client ID**, and **Client Secret** from **Settings → API Credentials**

### 3. Enable auth methods

Enable at least one in the Scalekit dashboard before first login (Social logins, Passwordless, Enterprise SSO, or bring your own auth).

### 4. Configure environment

```bash
cp .env.example .env
```

Fill in your values (see `.env.example`).

> **Important:** `SCALEKIT_RESOURCE_ID` is required for Dynamic Client Registration (DCR).

### 5. Install and run

```bash
pnpm install
pnpm dev
```

The server starts at `http://localhost:3001/mcp`.

## Project structure

| File | Purpose |
|------|---------|
| `src/lib/notes-store.ts` | Per-user notes persistence keyed by JWT `sub` |
| `src/lib/permissions.ts` | `hasPermission()` helper for RBAC checks in tools |
| `src/middleware.ts` | Wires the official Scalekit plugin |
| `src/tools/whoami.ts` | Returns the authenticated user session (`userId` = JWT `sub`) |
| `src/tools/save-note.ts` | Saves a note for the current user |
| `src/tools/list-my-notes.ts` | Lists notes for the current user only |
| `xmcp.config.ts` | Enables Streamable HTTP transport |

## How per-user identity works

After a teammate authenticates, Scalekit issues an MCP access token. The middleware validates it and exposes the session to tools:

```typescript
import { getSession } from "@xmcp-dev/scalekit";

const session = getSession();
// session.userId === JWT sub claim
```

- Alice connects and logs in → `sub` = Alice's ID → Alice's notes
- Bob connects to the **same URL** and logs in → `sub` = Bob's ID → Bob's notes

Notes are stored in `.data/notes.json` on the server, keyed by `userId`. In a production app, you would scope database queries, API calls, or file access the same way.

## RBAC permissions (optional)

`userId` scoping answers **whose data is this?** Permissions answer **should this person run this tool?** That is an authorization check in tool code.

| Permission | Tool | Effect |
| --- | --- | --- |
| `notes:read` | `list_my_notes` | List the caller's notes |
| `notes:write` | `save_note` | Save a note for the caller |

### Configure in Scalekit

1. Create permissions `notes:read` and `notes:write` in the Scalekit dashboard ([create roles and permissions](https://docs.scalekit.com/authenticate/authz/create-roles-permissions/)).
2. Create roles, for example:
   - **notes-viewer** — `notes:read` only
   - **notes-editor** — `notes:read` and `notes:write`
3. Assign roles to members who will connect to this MCP server.
4. Reconnect MCP clients after role changes so new tokens include updated `permissions` and `roles` claims.

Call `whoami` to confirm the token includes the expected `permissions` and `roles` arrays.

### How enforcement works

```typescript
import { getSession } from "@xmcp-dev/scalekit";
import { hasPermission } from "./lib/permissions";

const session = getSession();
if (!hasPermission(session, "notes:write")) {
  return "Missing notes:write permission.";
}
```

- `session.scopes` (`openid`, `profile`, `email`) identify the user.
- `session.permissions` (`notes:write`) control which tools they may run.

If the access token has **no** `permissions` claim, tools allow any authenticated user (per-user isolation still applies). Once Scalekit includes permissions on the token, the server enforces them.

## Two-user verification

Prove that teammates do not share data:

1. **Alice** connects her MCP client to `http://localhost:3001/mcp` (URL only — no secrets in config)
2. Alice completes Scalekit signup/login in the browser
3. Alice calls `save_note` with content `"Alice was here"`
4. Alice calls `list_my_notes` — sees her note
5. **Bob** connects the same URL with a different Scalekit account
6. Bob calls `list_my_notes` — sees an empty list (not Alice's note)
7. Bob calls `save_note` with `"Bob was here"` — only Bob sees it on `list_my_notes`

### Read-only role check (optional)

After you configure RBAC in Scalekit:

1. Assign **notes-viewer** (`notes:read` only) to Carol.
2. Carol connects, calls `list_my_notes` — succeeds (empty list or her notes).
3. Carol calls `save_note` — returns `Missing notes:write permission.`

## Test with MCP Inspector

1. Open [MCP Inspector](https://inspector.tools.modelcontextprotocol.io) or run `npx @modelcontextprotocol/inspector`

2. Configure the connection:
   - **Transport type:** Streamable HTTP
   - **URL:** `http://localhost:3001/mcp`
   - **Connection type:** Direct

3. Get an access token (client credentials):

   ```bash
   curl -X POST "$SCALEKIT_ENVIRONMENT_URL/oauth/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=$SCALEKIT_CLIENT_ID&client_secret=$SCALEKIT_CLIENT_SECRET"
   ```

4. In MCP Inspector, enable the **Authorization** custom header and set it to `Bearer <token>`

5. Click **Connect** — you should see `whoami`, `save_note`, and `list_my_notes` in the Tools tab

## Test with Claude Desktop / Cursor

MCP clients that support OAuth 2.1 handle the full flow automatically:

1. Client POSTs to `/mcp` and gets a `401` with a `WWW-Authenticate` header
2. Client fetches `/.well-known/oauth-protected-resource` to find the authorization server
3. Client fetches `/.well-known/oauth-authorization-server` to get the `registration_endpoint`
4. Client registers itself via DCR and starts the Authorization Code + PKCE flow
5. User signs up or logs in through Scalekit (auth methods from your dashboard)
6. Client sends authenticated requests to `/mcp`

For Claude Code:

```bash
claude mcp add --transport http xmcp-server http://localhost:3001/mcp
```

## How the auth works

The example uses the official `@xmcp-dev/scalekit` plugin:

```ts
import { scalekitProvider } from "@xmcp-dev/scalekit";

export default scalekitProvider({ ... });
```

The plugin provides:

- The OAuth discovery router (protected resource + authorization server metadata)
- Bearer token validation middleware using Scalekit JWKS
- `getSession()` and `getClient()` available inside tools

Per-user scoping and RBAC checks live in the demo-specific helpers (`src/lib/notes-store.ts` and `src/lib/permissions.ts`).

## Related

- [xmcp documentation](https://xmcp.dev/docs)
- [Scalekit MCP Auth quickstart](https://docs.scalekit.com/authenticate/mcp/quickstart)
- [Scalekit xmcp quickstart](https://docs.scalekit.com/authenticate/mcp/xmcp-quickstart)
- [MCP Authorization spec](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)