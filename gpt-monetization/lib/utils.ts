import { getBaseUrl } from "./base-url";

export const getAppsSdkCompatibleHtml = async (path: string) => {
  const baseUrl = getBaseUrl();
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type Product = {
  name: string;
  priceId: string;
};

export const suggestedProducts: Product[] = [
  // The price IDs from the earlier step
  { priceId: "price_1Secq0Bl7UhENxFIHZHYMbXG", name: "Test product 1" },
  { priceId: "price_1SecosBl7UhENxFI2Wulmea8", name: "Test product 2" },
];
