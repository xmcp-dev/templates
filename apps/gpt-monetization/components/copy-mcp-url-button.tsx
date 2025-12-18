"use client";

import { useState } from "react";

export function CopyMcpUrlButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const mcpUrl = `${window.location.origin}/mcp`;
    await navigator.clipboard.writeText(mcpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex h-9 items-center justify-center rounded border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
    >
      {copied ? "Copied!" : "Copy MCP endpoint"}
    </button>
  );
}
