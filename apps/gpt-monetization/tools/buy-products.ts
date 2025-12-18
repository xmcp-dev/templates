import { CheckoutItem, getCheckoutSession } from "@/lib/stripe";
import { ToolMetadata, InferSchema } from "xmcp";
import { z } from "zod";

export const schema = {
  items: z
    .array(
      z.object({
        priceId: z.string().describe("The Stripe price ID to purchase"),
        quantity: z
          .number()
          .int()
          .min(1)
          .describe("How many units of this price to purchase"),
      })
    )
    .nonempty()
    .describe("The line items to include in checkout"),
};

export const metadata: ToolMetadata = {
  name: "buy-products",
  description:
    "Create a checkout page link for purchasing the selected products",
  _meta: {
    openai: {
      widgetAccessible: true,
      resultCanProduceWidget: true,
    },
  },
};

export default async function handler({ items }: InferSchema<typeof schema>) {
  try {
    const session = await getCheckoutSession(items as CheckoutItem[]);

    return {
      content: [
        {
          type: "text",
          text: `[Complete your purchase here](${session.url})`,
        },
      ],
      structuredContent: {
        checkoutSessionId: session.id,
        checkoutSessionUrl: session.url,
      },
    };
  } catch (error) {
    console.error("Failed to create checkout session for products", error);
    return {
      content: [
        {
          type: "text",
          text: "Unable to start checkout right now. Please try again.",
        },
      ],
      // structuredContent must always be a plain object for MCP; return an empty object on error.
      structuredContent: {},
    };
  }
}
