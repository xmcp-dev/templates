import type { NextConfig } from "next";
import { getBaseUrl } from "./lib/base-url";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "files.stripe.com" }],
  },
  assetPrefix: getBaseUrl(),
};

export default nextConfig;
