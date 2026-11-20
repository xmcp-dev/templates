import { x402Provider } from "@xmcp-dev/x402";

export default x402Provider({
  // nano_ address that receives XNO. The provider checks its checksum on start.
  wallet: process.env.X402_NANO_WALLET!,
  debug: true,
  nano: {
    // Nano node RPC used to read the payer's send block
    rpc: process.env.NANO_RPC_URL ?? "https://rpc.nano.to",
    // Every block hash that paid for a call is appended here before the tool
    // runs, so the same block is refused again after a restart
    claimsFile: process.env.NANO_CLAIMS_FILE ?? "nano-claims.txt",
    // Each 402 offer carries a fresh orderId; a block only pays for its order
    requireBinding: true,
  },
  defaults: {
    price: 0.001,
    currency: "XNO",
    network: "nano",
  },
});
