import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-[100svh] flex-col items-start justify-center px-5">
      <div className="mx-auto w-full max-w-6xl">
        <p className="signal font-mono text-sm">404</p>
        <h1 className="mt-4 font-display text-[18vw] leading-[0.85] tracking-tight uppercase sm:text-[12vw]">
          Wrong
          <br />
          <span className="hero-outline">track.</span>
        </h1>
        <p className="mt-8 max-w-sm text-foreground/70">
          This page isn&apos;t in the crate. Head back to the main set.
        </p>
        <Link
          href="/"
          className="hard-shadow mt-8 inline-flex h-11 items-center bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
