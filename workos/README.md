# WorkOS Authentication with xmcp

This project demonstrates how to create an authenticated MCP server using WorkOS AuthKit.

## Getting Started

### 1. WorkOS Setup

Before running the server, you need to configure WorkOS:

1. Go to your [WorkOS Dashboard](https://dashboard.workos.com)
2. Navigate to **Connect** → **Configuration**
3. Enable **MCP Auth** settings:
   - **Client ID Metadata Document (CIMD)** - Required for MCP clients to authenticate
   - **Dynamic Client Registration (DCR)** - Optional, for backwards compatibility

### 2. Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your WorkOS credentials:

```bash
WORKOS_API_KEY=sk_test_...
WORKOS_CLIENT_ID=client_...
WORKOS_AUTHKIT_DOMAIN=yourcompany.authkit.app
BASE_URL=http://127.0.0.1:3002
```

### 3. Run the Server

```bash
npm run dev
# or
pnpm dev
```

This will start the MCP server with HTTP transport and WorkOS authentication enabled.

## How It Works

1. MCP clients send requests with `Authorization: Bearer <token>` header
2. The middleware verifies the JWT using WorkOS AuthKit's JWKS endpoint
3. Valid sessions are stored in AsyncLocalStorage context
4. Tools can access session data via `getSession()` and `getUser()`

## Using Session Data in Tools

```typescript
import { getSession, getUser } from "@xmcp-dev/workos";

export default async function myTool() {
  // Get session data from JWT (fast, no API call)
  const session = getSession();
  console.log(session.userId);
  console.log(session.organizationId);

  // Get full user data from WorkOS API
  const user = await getUser();
  console.log(user.email);
  console.log(user.firstName);

  return `Hello ${user.firstName}!`;
}
```

## OAuth Endpoints

The plugin automatically registers these endpoints:

- `GET /.well-known/oauth-protected-resource` - Resource server metadata
- `GET /.well-known/oauth-authorization-server` - Authorization server metadata

## Monorepo Development

This template is part of the xmcp-templates monorepo.

### Commands

```bash
# From monorepo root
pnpm dev          # Run all apps
pnpm build        # Build all apps
pnpm typecheck    # Type-check all apps

# From this directory
pnpm dev          # Run this app only
```

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [WorkOS Integration Guide](https://xmcp.dev/docs/integrations/workos)
- [WorkOS Dashboard](https://dashboard.workos.com)
