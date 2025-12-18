export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-green-600">
          Payment successful
        </p>
        <h1 className="text-3xl font-semibold">Thank you for your purchase!</h1>
      </div>
    </main>
  );
}
