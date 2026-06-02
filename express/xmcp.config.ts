import { XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: true,
  experimental: {
    adapter: "express",
  },
  paths: {
    prompts: false,
    resources: false,
  },
};

export default config;
