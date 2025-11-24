# Next.js with xmcp

This is a [Next.js](https://nextjs.org) project integrated with [xmcp](https://xmcp.dev) for building MCP (Model Context Protocol) servers.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This will start both the xmcp dev server and the Next.js dev server concurrently. The MCP endpoint will be available at `/mcp` route.

Open [http://localhost:3000](http://localhost:3000) with your browser to see your Next.js app.

## Project Structure

This project uses the structured approach where tools are automatically discovered from their respective directories:

- `src/tools` - Tool definitions with Zod schemas
- `app/mcp/route.ts` - MCP endpoint handler using the Next.js adapter

### Tools

This template includes two example tools: `greet` and `weather`. Each tool is defined in its own file with the following structure:

**Simple synchronous tool example (`greet.ts`):**

```typescript
import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";

export const schema = {
  name: z.string().describe("The name of the user to greet"),
};

export const metadata: ToolMetadata = {
  name: "greet",
  description: "Greet the user",
  annotations: {
    title: "Greet the user",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default function greet({ name }: InferSchema<typeof schema>) {
  return `Hello, ${name}!`;
}
```

**Async tool example (`weather.ts`):**

```typescript
import { z } from "zod";
import { type ToolMetadata, type InferSchema } from "xmcp";

export const schema = {
  city: z
    .enum(["Buenos Aires", "San Francisco", "Berlin", "Tokyo", "New York"] as const)
    .describe("The city to get weather for"),
};

export const metadata: ToolMetadata = {
  name: "weather",
  description: "Get current weather information for a city",
  annotations: {
    title: "Get weather",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function weather({
  city,
}: InferSchema<typeof schema>): Promise<string> {
  // Map city to coordinates and fetch weather data
  const cityCoords = getCityCoordinates(city);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityCoords.lat}&longitude=${cityCoords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return `Weather for ${city}:
Temperature: ${data.current.temperature_2m}°C
Humidity: ${data.current.relative_humidity_2m}%
Wind Speed: ${data.current.wind_speed_10m} km/h`;
}
```

## Adding New Tools

To add a new tool:

1. Create a new `.ts` file in the `src/tools` directory
2. Export a `schema` object defining the tool parameters using Zod
3. Export a `metadata` object with tool information
4. Export a default function that implements the tool logic

The tool will be automatically discovered and registered with the MCP server.

## MCP Endpoint

The MCP server is available at `/mcp` route. The handler is configured in `app/mcp/route.ts` using the Next.js adapter:

```typescript
import { xmcpHandler } from "@xmcp/adapter";

export { xmcpHandler as GET, xmcpHandler as POST };
```

## Authentication

You can add authentication to your MCP server by using the `withAuth` function. See the [xmcp Next.js documentation](https://xmcp.dev/docs/adapters/nextjs) for more details.

## Building for Production

To build your project for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will build both the xmcp tools and the Next.js application.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [xmcp Documentation](https://xmcp.dev/docs) - learn about xmcp and MCP servers
- [xmcp Next.js Adapter](https://xmcp.dev/docs/adapters/nextjs) - learn about using xmcp with Next.js
