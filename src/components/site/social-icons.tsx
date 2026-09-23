import type { SVGProps } from "react";

/**
 * Lucide dropped brand/logo icons — these are hand-drawn outline
 * equivalents kept visually consistent with the lucide icon set
 * (24x24 grid, 2px stroke, round joins).
 */

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h2.5l.5-4H12V8a1 1 0 0 1 1-1h2z" />
    </IconBase>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M14 4v10.5a3 3 0 1 1-2.5-2.96" />
      <path d="M14 4c.6 2.3 2.2 3.8 4.5 4.1" />
    </IconBase>
  );
}

export function SoundcloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 13v4" />
      <path d="M6 11v6" />
      <path d="M9 9.5v7.5" />
      <path d="M12 8v9h6.5a3.5 3.5 0 0 0 .4-6.98A4.5 4.5 0 0 0 12 8" />
    </IconBase>
  );
}
