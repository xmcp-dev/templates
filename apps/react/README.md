# ChatGPT React Widgets with xmcp

This project demonstrates how to create ChatGPT widgets using xmcp and React.

## Getting Started

```bash
npm run dev
```

This will start the development server with HTTP transport enabled.

## Features

- **React Components**: Build interactive widgets using React
- **Server-Side Rendering**: Automatically enabled whenever React tools are present
- **TypeScript**: Full TypeScript support for type safety

## Example Tools

- **Counter**: A simple counter widget demonstrating state management
- **Weather**: An interactive weather app that fetches real-time data

## Monorepo Development

This template is part of the xmcp-templates monorepo.

### Shared Configurations

- **TypeScript**: Extends `@xmcp-templates/catalog/tsconfig/react.json`
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
