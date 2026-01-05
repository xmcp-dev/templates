export function getBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return `https://gpt-apps-monetization.vercel.app`;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3002";
  }

  return `http://localhost:3002`;
}
