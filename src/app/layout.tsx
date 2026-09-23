import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const TITLE = "DJ Abdul — Bollywood & Club DJ, Bangalore & Mumbai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "DJ Abdul",
    "DJ Abdul India",
    "Bollywood DJ",
    "Bangalore DJ",
    "Mumbai DJ",
    "wedding DJ Bangalore",
    "club DJ booking",
    "Formula 1 DJ",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: TITLE,
    description:
      "Bangalore & Mumbai DJ and producer since 1996, official Formula 1 DJ. Book DJ Abdul for your next event.",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Bangalore & Mumbai DJ and producer since 1996, official Formula 1 DJ.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
        <a
          href="#main"
          className="sr-only z-[100] bg-primary px-4 py-2 font-mono text-xs tracking-wider text-primary-foreground uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
