# Auth0 Authentication with xmcp

This project demonstrates how to create an authenticated MCP server using Auth0.

## Getting Started

### 1. Auth0 Setup

Before running the server, you need to configure Auth0:

1. Go to your [Auth0 Dashboard](https://manage.auth0.com)
2. Create a new API or use an existing one
3. Create a Machine-to-Machine application with access to your API
4. Note your credentials (Domain, Client ID, Client Secret, Audience)

### 2. Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your Auth0 credentials:

```bash
DOMAIN=your-tenant.auth0.com
AUDIENCE=http://127.0.0.1:3001/
CLIENT_ID=your-m2m-client-id
CLIENT_SECRET=your-m2m-client-secret
BASE_URL=http://127.0.0.1:3001
```

### 3. Run the Server

```bash
npm run dev
# or
pnpm dev
```

This will start the MCP server with HTTP transport and Auth0 authentication enabled.

## How It Works

1. MCP clients send requests with `Authorization: Bearer <token>` header
2. The middleware verifies the JWT using Auth0's JWKS endpoint
3. Valid sessions are stored in AsyncLocalStorage context
4. Tools can access auth data via `getAuthInfo()`

## Using Auth Data in Tools

```typescript
import { getAuthInfo } from "@xmcp-dev/auth0";

export default function myTool() {
  // Get auth info from JWT
  const authInfo = getAuthInfo();
  
  console.log(authInfo.user.sub);      // User ID
  console.log(authInfo.user.email);    // User email
  console.log(authInfo.user.name);     // User name
  console.log(authInfo.clientId);      // Client ID
  console.log(authInfo.scopes);        // Token scopes
  console.log(authInfo.expiresAt);     // Token expiration

  return `Hello ${authInfo.user.name}!`;
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
- [Auth0 Integration Guide](https://xmcp.dev/docs/integrations/auth0)
- [Auth0 Dashboard](https://manage.auth0.com)
