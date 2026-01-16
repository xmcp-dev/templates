# Clerk Authentication with xmcp

This template demonstrates how to create an authenticated MCP server using Clerk.

## Getting Started

### 1. Clerk Setup

Before running the server, you need to configure Clerk:

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or use an existing one
3. Go to **Configure** and access **API Keys** to get:
   - **Secret Key** (`sk_...`)
   - **Frontend API** URL (`your-app.clerk.accounts.dev`)
4. Click on **Development**, enter **OAuth Applications** and enable **Dynamic Client Registration**

### 2. Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your Clerk credentials:

```bash
CLERK_SECRET_KEY=sk_test_...
CLERK_DOMAIN=your-app.clerk.accounts.dev
BASE_URL=http://127.0.0.1:3001
```

### 3. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 4. Run the Server

```bash
pnpm dev
# or
npm run dev
```

This will start the MCP server with HTTP transport and Clerk authentication enabled.

## How It Works

1. MCP clients send requests with `Authorization: Bearer <token>` header
2. The middleware verifies the JWT using Clerk's JWKS endpoint
3. Valid sessions are stored in AsyncLocalStorage context
4. Tools can access session data via `getSession()` and `getUser()`

## Using Session Data in Tools

```typescript
import { getSession, getUser, getClient } from "@xmcp-dev/clerk";

export default async function myTool() {
  // Get session data from JWT (fast, no API call)
  const session = getSession();
  console.log(session.userId);
  console.log(session.organizationId);

  // Get full user data from Clerk API
  const user = await getUser();
  console.log(user.firstName);
  console.log(user.emailAddresses[0]?.emailAddress);

  // Access the Clerk SDK client directly
  const clerk = getClient();
  const memberships = await clerk.users.getOrganizationMembershipList({
    userId: session.userId,
  });
}
```

### Session Properties

| Property | Type | Description |
|----------|------|-------------|
| `userId` | `string` | Unique user identifier |
| `sessionId` | `string \| undefined` | Current session ID |
| `organizationId` | `string \| undefined` | Organization ID (if in an org) |
| `organizationRole` | `string \| undefined` | Role in the organization |
| `organizationPermissions` | `string[] \| undefined` | Organization permissions |
| `expiresAt` | `Date` | Token expiration time |
| `issuedAt` | `Date` | Token issue time |

## Available Tools

This template includes four tools:

- **whoami** - Returns full session and user account information
- **greet** - Greets a person by name and shows your Clerk user ID
- **get-user-info** - Fetches detailed user profile from Clerk API
- **get-my-organizations** - Lists all organization memberships

## OAuth Endpoints

The plugin automatically registers these endpoints:

- `GET /.well-known/oauth-protected-resource` - Resource server metadata
- `GET /.well-known/oauth-authorization-server` - Authorization server metadata

## Building for Production

```bash
pnpm build
# or
npm run build
```

Then start the server:

```bash
pnpm start
# or
npm start
```

## Troubleshooting

### "Missing or invalid bearer token"

The client isn't sending a token. Make sure:
- Dynamic Client Registration is enabled in Clerk
- The client completed the OAuth flow

### Missing Configuration Errors

If you see `"[Clerk] Missing required config: ..."` at startup:
- Ensure all required environment variables are set (`CLERK_SECRET_KEY`, `CLERK_DOMAIN`, `BASE_URL`)
- Check your `.env` file is being loaded correctly

### Session or Client Not Initialized

If `getSession()`, `getUser()`, or `getClient()` throws `"... not initialized"`:
- Ensure `clerkProvider` is exported as default from `middleware.ts`
- Ensure the tool is called on a route under `/mcp/*`
- Don't call these functions at module load time—only inside tool handlers

### "Token has expired"

Access tokens are short-lived. The client should automatically refresh. If it persists:
- Disconnect and reconnect in the MCP client
- Check that your system clock is accurate

### "Token verification failed"

- Verify your `CLERK_SECRET_KEY` is correct
- Verify your `CLERK_DOMAIN` matches your Clerk application's Frontend API
- Make sure you're using the right environment (test vs production)

### Authentication Service Misconfigured

If you see a `500` error with `"Authentication service misconfigured"`:
- Your `CLERK_SECRET_KEY` is invalid or doesn't match your Clerk application
- Double-check you're using the correct key for your environment (development vs production)

## Learn More

- [Clerk Integration Guide](https://xmcp.dev/docs/integrations/clerk)
- [xmcp Documentation](https://xmcp.dev/docs)
- [Clerk Documentation](https://clerk.com/docs)
