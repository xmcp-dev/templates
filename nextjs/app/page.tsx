import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <a
          href="https://xmcp.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity flex justify-center"
        >
          <Image
            src="https://assets.basehub.com/bf7c3bb1/303b8a62053c9d86ca3b972b5597ab5c/x.png"
            alt="XMCP logo"
            width={192}
            height={192}
            priority
          />
        </a>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-2xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            The TypeScript framework for building MCP servers
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Build and ship powerful tools on top of the Model Context Protocol
            ecosystem with zero friction.
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-left text-base text-zinc-600 dark:text-zinc-400 sm:max-w-md">
            <li>⊹ File System Routing - Tools and prompts auto-registered</li>
            <li>⊹ Hot Reloading - Instant development feedback</li>
            <li>⊹ Middlewares - Authentication and custom middlewares</li>
            <li>⊹ Deploy Anywhere - Flexible deployment across platforms</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row items-center justify-center">
          <Button variant="primary" asChild>
            <Link
              href="https://xmcp.dev/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href="https://xmcp.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
