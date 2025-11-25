# ChatGPT Widgets with xmcp

This project demonstrates how to create ChatGPT widgets using xmcp.

## Getting Started

```bash
npm run dev
```

This will start the development server with HTTP transport enabled.

## Monorepo Development

This template is part of the xmcp-templates monorepo.

### Shared Configurations

- **TypeScript**: Extends `@xmcp-templates/catalog/tsconfig/base.json`
- **ESLint**: Uses `@xmcp-templates/catalog/eslint`
- **Prettier**: Uses `@xmcp-templates/catalog/prettier`

### Commands

```bash
# From monorepo root
pnpm dev          # Run all apps
pnpm build        # Build all apps
pnpm lint         # Lint all apps
pnpm typecheck    # Type-check all apps

# From this directory
pnpm dev          # Run this app only
```

## Learn More

- [xmcp Documentation](https://xmcp.dev)
- [ChatGPT Widgets Guide](https://xmcp.dev/docs/integrations/chatgpt)
