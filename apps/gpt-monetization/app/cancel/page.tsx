export default function CancelPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-red-600">
          Checkout canceled
        </p>
        <h1 className="text-3xl font-semibold">Your payment was canceled</h1>
        <p className="text-base text-gray-600">
          No charges were made. You can return to the product list and try again
          whenever you are ready.
        </p>
      </div>
    </main>
  );
}
