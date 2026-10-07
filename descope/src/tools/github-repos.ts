import type { ToolMetadata } from "xmcp";
import { fetchConnectionToken } from "@xmcp-dev/descope";

export const metadata: ToolMetadata = {
  name: "github-repos",
  description:
    "Lists the authenticated user's GitHub repositories using a Descope connection token",
};

export default async function githubRepos(): Promise<string> {
  const accessToken = await fetchConnectionToken("github");

  const response = await fetch("https://api.github.com/user/repos", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const repos = await response.json();
  return JSON.stringify(repos, null, 2);
}
