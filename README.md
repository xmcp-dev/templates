<div align="center">
  <a href="https://xmcp.dev?utm_source=templates&utm_medium=readme&utm_campaign=templates-readme">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.basehub.com/bf7c3bb1/303b8a62053c9d86ca3b972b5597ab5c/x.png">
      <img alt="XMCP logo" src="https://assets.basehub.com/bf7c3bb1/303b8a62053c9d86ca3b972b5597ab5c/x.png" height="128">
    </picture>
  </a>
  <h1>templates</h1>

<a href="https://basement.studio"><img alt="xmcp logo" src="https://img.shields.io/badge/MADE%20BY%20basement.studio-000000.svg?style=for-the-badge&labelColor=000"></a>

</div>

## Foundational Templates for xmcp

This repository contains foundational templates for building with xmcp.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm 9.15.0+

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all apps
pnpm dev

# Run a specific app
pnpm dev --filter @xmcp-templates/nextjs
```

### Build

```bash
pnpm build
```

## Project Structure

```
├── apps/
│   ├── nextjs/       # Next.js template
│   ├── react/        # React template
│   ├── openai/       # OpenAI template
│   └── typescript/   # TypeScript template
├── packages/
│   └── catalog/      # Shared configs (TS, ESLint, Prettier)
├── turbo.json        # Turborepo config
└── pnpm-workspace.yaml
```

## Available Templates

### TypeScript

A complete xmcp application template with support for tools, prompts, and resources. This template demonstrates the structured approach where components are automatically discovered from their respective directories.

### OpenAI

A template for creating ChatGPT widgets using xmcp. This template is optimized for building interactive widgets that integrate seamlessly with OpenAI's ChatGPT interface.

Includes example tools and demonstrates how to create widgets that work with ChatGPT's widget system.

### React

A template for creating ChatGPT widgets using xmcp and React. This template supports returning React components as part of the tool response.

Includes example tools like a counter widget and weather app to demonstrate state management and real-time data fetching.

## Learn more

⊹ Visit [xmcp.dev](https://xmcp.dev?utm_source=templates&utm_medium=readme&utm_campaign=templates-readme) to learn more about the project.\
⊹ Visit [xmcp.dev/docs](https://xmcp.dev/docs?utm_source=templates&utm_medium=readme&utm_campaign=templates-readme) to view the full documentation.\
⊹ Visit [xmcp.dev/docs/integrations/openai](https://xmcp.dev/docs/integrations/openai?utm_source=templates&utm_medium=readme&utm_campaign=templates-readme) to learn about OpenAI widgets.
