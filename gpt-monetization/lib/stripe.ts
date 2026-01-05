import Stripe from "stripe";
import { getBaseUrl } from "./base-url";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type CheckoutItem = { priceId: string; quantity: number };

export async function getCheckoutSession(items: CheckoutItem[]) {
  // Merge duplicate priceIds so Stripe receives a single line item per price.
  const quantityByPriceId = items.reduce<Record<string, number>>(
    (acc, { priceId, quantity }) => {
      const safeQuantity = Math.max(1, Math.floor(quantity));
      acc[priceId] = (acc[priceId] ?? 0) + safeQuantity;
      return acc;
    },
    {}
  );

  const url = getBaseUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: Object.entries(quantityByPriceId).map(
      ([priceId, quantity]) => ({
        price: priceId,
        quantity,
      })
    ),
    success_url: `${url}/success`,
    cancel_url: `${url}/cancel`,
  });

  return session;
}

export type FormattedProduct = {
  id: string;
  priceId: string;
  image: string | null;
  name: string;
  description: string | null;
};

export async function getProducts(): Promise<FormattedProduct[]> {
  const { data: products } = await stripe.products.list();
  return products.map((product) => {
    return {
      id: product.id,
      priceId: product.default_price as string,
      image: product.images?.[0],
      name: product.name,
      description: product.description,
    };
  });
}
