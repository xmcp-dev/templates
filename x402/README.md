# x402 Monetization with xmcp

This project demonstrates how to monetize MCP tools with x402 using USDC micropayments on Base.

## Getting Started

### 1. Environment Variables

Copy the example environment file and fill in your wallet:

```bash
cp .env.example .env
```

Then edit `.env`:

```bash
X402_WALLET=0xYOUR_WALLET_ADDRESS

# Optional: custom facilitator URL
# X402_FACILITATOR=https://x402.org/facilitator
```

### 2. Run the Server

```bash
npm run dev
# or
pnpm dev
```

This starts an HTTP MCP server with x402 payment middleware enabled.

## How It Works

The template includes three tools:

- `greet` - Paid tool that uses the middleware default price (`$0.01`)
- `hash-string` - Paid tool with custom price override (`$0.05`)
- `random-number` - Free tool with no payment required

Paid tools are wrapped with `paid()` from `@xmcp-dev/x402`.

## x402 Middleware

The provider is configured in `src/middleware.ts`:

- default price: `0.01` USDC
- currency: `USDC`
- network: `base-sepolia`
- facilitator: `https://x402.org/facilitator` (default fallback)

`base-sepolia` is intended for testing. Switch to `base` for production workloads.

## Monorepo Development

This template is part of the xmcp-templates monorepo.

### Commands

```bash
# From monorepo root
pnpm dev
pnpm build
pnpm typecheck

# From this directory
pnpm dev
```

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [x402 Integration Guide](https://xmcp.dev/docs/integrations/x402)
