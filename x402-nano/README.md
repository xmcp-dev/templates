# xmcp x402 Nano Template

Monetize MCP tools with x402 using XNO micropayments on Nano (`nano:mainnet`, scheme `exact`).

## Features

- x402 payment middleware for per-tool pricing, priced in XNO
- No facilitator: payments are read from a Nano node, no key is held and nothing is broadcast
- Each payment is bound to one 402 offer (`requireBinding`)
- Used block hashes are written to a file, so a block cannot pay twice, even after a restart (`claimsFile`)
- Free and paid tools in the same server
- Example tools: `greet` (paid, 0.001 XNO), `word-count` (paid, 0.002 XNO), `random-number` (free)

## Getting Started

### Prerequisites

You need a `nano_` address to receive XNO. The server refuses to start if the address or its checksum is invalid.

### 1. Create the project

```bash
npx create-xmcp-app --example x402-nano
```

### 2. Environment setup

```bash
cp .env.example .env
```

Edit `.env` with your address:

```bash
X402_NANO_WALLET=nano_YOUR_ADDRESS

# Optional: Nano node RPC (defaults to https://rpc.nano.to)
# NANO_RPC_URL=https://rpc.nano.to

# Optional: where used block hashes are kept (defaults to ./nano-claims.txt)
# NANO_CLAIMS_FILE=/var/lib/my-server/nano-claims.txt
```

### 3. Install & run

```bash
pnpm install
pnpm dev
```

## How It Works

The middleware is configured in `src/middleware.ts`:

- **Default price:** `0.001` XNO per tool call (on `nano`, `price` is in XNO; the plugin converts it to raw, 1 XNO = 10^30 raw)
- **Network:** `nano` (`nano:mainnet`)
- **RPC:** `NANO_RPC_URL`, or `https://rpc.nano.to`
- **Replay store:** `NANO_CLAIMS_FILE`, or `./nano-claims.txt`

A paid call without payment gets a 402 offer with `extra.binding: "xno-binding/v1/rep"` and a fresh `extra.orderId`.
The payer then:

1. computes the order commitment, the `nano_` encoding of
   `SHA-256("xno-binding/v1/rep|" + orderId + "|" + payTo + "|" + amount)` with `amount` in raw;
2. publishes a send block of exactly `amount` raw to `payTo`, with that commitment as the block's representative;
3. calls the tool again with `payload: { blockHash, orderId }`.

The server reads the block from the node and runs the tool only when it is a confirmed send of exactly the price to
your address, for that order, whose hash has not paid for an earlier call. The hash is flushed to the claims file
before the tool runs; if the tool fails, the claim is released and the block can pay again.

### Making Tools Paid

Wrap tools with `paid()` from `@xmcp-dev/x402`:

```typescript
import { paid } from "@xmcp-dev/x402";

// Uses the middleware default (0.001 XNO)
export default paid(async function greet({ name }) {
  return `Hello, ${name}!`;
});

// Custom price (0.002 XNO)
export default paid(
  { network: "nano", price: 0.002 },
  async function wordCount({ text }) {
    return text.trim().split(/\s+/).filter(Boolean).length.toString();
  }
);
```

Tools without the `paid()` wrapper are free.

## Deploy

```bash
pnpm build
node dist/http.js
```

Set `NANO_CLAIMS_FILE` to a path on persistent storage. One claims file belongs to one server process.

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [x402 Integration Guide](https://xmcp.dev/docs/integrations/x402)
- [`@xmcp-dev/x402` README, Nano section](https://www.npmjs.com/package/@xmcp-dev/x402)
