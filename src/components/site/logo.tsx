export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="DJ Abdul logo"
    >
      <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 28V12h6.2c4 0 6.4 2.9 6.4 8s-2.4 8-6.4 8H11Zm3.4-3h2.6c2.3 0 3.5-1.7 3.5-5s-1.2-5-3.5-5h-2.6v10Z"
        fill="currentColor"
      />
      <circle cx="29" cy="11.5" r="1.6" fill="var(--signal)" />
    </svg>
  );
}

export function LogoWordmark({
  className = "",
  size = "text-xl",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={`font-display tracking-wide uppercase ${size} ${className}`}
    >
      DJ Abdul
    </span>
  );
}
