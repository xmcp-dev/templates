"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

type Product = {
  name: string;
  priceId: string;
  image: string | null;
};

type ProductCardProps = {
  product: Product;
  quantity: number;
  onQuantityChange: (priceId: string, quantity: number) => void;
};

export function ProductCard({
  product,
  quantity,
  onQuantityChange,
}: ProductCardProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuantity = Math.max(
      0,
      Math.floor(Number(event.target.value) || 0)
    );
    onQuantityChange(product.priceId, nextQuantity);
  };

  const increment = () => onQuantityChange(product.priceId, quantity + 1);
  const decrement = () =>
    onQuantityChange(product.priceId, Math.max(0, quantity - 1));

  return (
    <div className="flex flex-col gap-4 rounded border border-gray-200 p-4 sm:flex-row sm:items-center sm:gap-5">
      <div className="aspect-video w-full max-w-48 overflow-hidden rounded bg-gray-50 sm:max-w-40">
        {product.image ? (
          <Image
            src={product.image}
            width={100}
            height={100}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-base font-semibold text-gray-900">
          {product.name}
        </span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span>Quantity</span>
            <div className="inline-flex items-stretch overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={decrement}
                className="px-2 text-base text-gray-700 transition hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                name={`quantity-${product.priceId}`}
                min={0}
                step={1}
                value={quantity}
                onChange={handleChange}
                className="w-20 border-x border-gray-200 bg-transparent text-right text-sm outline-none"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={increment}
                className="px-2 text-base text-gray-700 transition hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
