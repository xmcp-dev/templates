import { type XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: { port: 3003 },
  experimental: {
    adapter: "nextjs",
  },
  paths: {
    tools: "tools",
    prompts: false,
    resources: false,
  },
};

export default config;