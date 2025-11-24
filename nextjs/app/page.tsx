import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <a
          href="https://xmcp.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src="https://assets.basehub.com/bf7c3bb1/303b8a62053c9d86ca3b972b5597ab5c/x.png"
            alt="XMCP logo"
            width={128}
            height={128}
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
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://xmcp.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://xmcp.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}
