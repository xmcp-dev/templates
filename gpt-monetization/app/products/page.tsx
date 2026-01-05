"use client";

import { FormEvent, useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { useToolOutput } from "../../hooks/use-tool-output";
import { useCallTool } from "../../hooks/use-call-tool";
import { useOpenExternal } from "../../hooks/use-open-external";

type Product = {
  name: string;
  priceId: string;
  image: string | null;
};

type CheckoutItem = { priceId: string; quantity: number };

export default function ProductsPage() {
  const callTool = useCallTool();
  const openExternal = useOpenExternal();
  const toolOutput = useToolOutput<{ products?: Product[] }>();
  const products = useMemo(
    () => (Array.isArray(toolOutput?.products) ? toolOutput.products : []),
    [toolOutput]
  );

  const [status, setStatus] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const canCheckout = useMemo(
    () => products.some((product) => (quantities[product.priceId] ?? 0) > 0),
    [products, quantities]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const items: CheckoutItem[] = Object.entries(quantities)
      .map(([priceId, quantity]) => ({ priceId, quantity }))
      .filter((item) => item.quantity > 0);

    if (!items.length) {
      setStatus("Set a quantity for at least one product to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await callTool("buy-products", {
        items,
      });

      const checkoutUrl =
        result?.structuredContent &&
        (result.structuredContent as { checkoutSessionUrl?: string })
          .checkoutSessionUrl;

      if (checkoutUrl) {
        setCheckoutUrl(checkoutUrl);
        setStatus("Checkout ready. Click the button below to continue.");
      } else {
        setStatus("No checkout URL returned. Please try again.");
      }
    } catch (error) {
      console.error("Failed to start checkout", error);
      setStatus("Failed to start checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Select products to purchase</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {products.length ? (
          <ProductGrid
            products={products}
            quantities={quantities}
            onQuantityChange={(priceId, quantity) =>
              setQuantities((prev) => ({ ...prev, [priceId]: quantity }))
            }
          />
        ) : checkoutUrl ? null : (
          <p className="text-sm text-gray-500">
            Waiting for products from the tool output…
          </p>
        )}

        <button
          type={checkoutUrl ? "button" : "submit"}
          className="inline-flex w-full items-center justify-center rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-60"
          disabled={
            isSubmitting || (!checkoutUrl && (!products.length || !canCheckout))
          }
          onClick={() =>
            !isSubmitting && checkoutUrl && openExternal(checkoutUrl)
          }
        >
          {isSubmitting
            ? "Processing…"
            : checkoutUrl
            ? "Open checkout"
            : "Proceed to checkout"}
        </button>

        {status ? (
          <p className="text-sm text-gray-700" role="status">
            {status}
          </p>
        ) : null}
      </form>
    </main>
  );
}
