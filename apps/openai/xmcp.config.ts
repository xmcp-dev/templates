import { XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: { port: 3005 },
  paths: {
    tools: "./src/tools",
    prompts: false,
    resources: false,
  },
};

export default config;
