import { XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: { port: 3004 },
  paths: {
    tools: "./src/tools",
    prompts: false,
    resources: false,
  },
};

export default config;
