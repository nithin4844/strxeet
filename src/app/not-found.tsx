import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[120px] sm:text-[180px] text-brand-gray-100 leading-none select-none">
        404
      </p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-widest text-brand-black mb-4 -mt-8">
        PAGE NOT FOUND
      </h1>
      <p className="text-brand-gray-500 mb-8 max-w-sm">
        Looks like this page dropped out of the collection. Let&apos;s get you back on track.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
