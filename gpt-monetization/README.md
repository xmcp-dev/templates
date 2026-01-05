# Monetize your GPT apps with Stripe

Allow users to buy products directly from ChatGPT through Stripe's external checkout integration.

Find the complete guide on [xmcp.dev/blog/apps-monetization](https://xmcp.dev/blog/apps-monetization).

This project was bootstrapped with `create-next-app` and `init-xmcp`.

## Project Structure

```
gpt-apps-monetization/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── success/page.tsx
│   ├── cancel/page.tsx
│   ├── mcp/route.ts          # MCP endpoint
│   └── products/page.tsx     # Products widget
├── hooks/
│   ├── use-call-tool.ts      # Hook to invoke MCP tools
│   ├── use-tool-output.ts    # Hook to access tool output
│   └── use-open-external.ts  # Hook to open external links
├── lib/
│   ├── stripe.ts             # Stripe integration
│   └── utils.ts
├── tools/
│   ├── buy-products.ts       # Buy products tool
│   └── list-products.ts      # List products tool
└── xmcp.config.ts
```

## Getting Started

1. Clone and install dependencies:

```bash
git clone https://github.com/xmcp-dev/gpt-apps-monetization
cd gpt-apps-monetization
pnpm install
```

2. Set up Stripe:

   - Create a [Stripe](https://stripe.com) account and enable sandbox mode
   - Copy your secret key (`sk_test_…`)
   - Create some one-off products

3. Configure environment variables:

```bash
cp .env.example .env
# Add your STRIPE_SECRET_KEY
```

4. Run the development server:

```bash
pnpm dev
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xmcp-dev/gpt-apps-monetization)

## Testing with ChatGPT

1. Deploy your app and get the MCP endpoint URL (`https://your-app.vercel.app/mcp`)
2. In ChatGPT, go to **Apps & Connectors** → **Advanced Settings** and enable developer mode
3. Create a new connector with your MCP server URL (no authentication required)
4. Start a new chat and use `/` to access your connector
