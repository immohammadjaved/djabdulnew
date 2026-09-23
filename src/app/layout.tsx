import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "DJ Abdul — Official Site",
  description:
    "DJ Abdul — Bangalore & Mumbai DJ and producer since 1996, official Formula 1 DJ. Bollywood, Latin, tribal & progressive house. Book DJ Abdul for your next event, club night or festival.",
  keywords: [
    "DJ Abdul",
    "DJ Abdul India",
    "Bollywood DJ",
    "Bangalore DJ",
    "Mumbai DJ",
    "wedding DJ",
    "club DJ booking",
  ],
  openGraph: {
    title: "DJ Abdul — Official Site",
    description:
      "Bangalore & Mumbai DJ and producer since 1996, official Formula 1 DJ. Book DJ Abdul for your next event.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
