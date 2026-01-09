# xmcp TypeScript Starter

Spin this template up directly:

```bash
npx create-xmcp-app@latest --example typescript
```

This is the minimal xmcp starter: HTTP transport enabled, typed tools/prompts/resources, and automatic discovery of files in `src/tools`, `src/prompts`, and `src/resources`.

## Develop

```bash
npm run dev
# or yarn dev / pnpm dev
```

## Structure at a Glance

- Tools: define `schema`, `metadata`, and a default function in `src/tools/*`.
- Prompts: same pattern in `src/prompts/*` returning a template string.
- Resources: URI-shaped files in `src/resources/*`; folder names map to URI segments.

## Build & Run

```bash
npm run build
npm run start   # runs the built transport entry (http/stdio)
```
