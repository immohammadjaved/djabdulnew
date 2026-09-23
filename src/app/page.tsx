import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { GenreMarquee } from "@/components/site/marquee";
import { About } from "@/components/site/about";
import { Journey } from "@/components/site/journey";
import { Sound } from "@/components/site/sound";
import { Videos } from "@/components/site/videos";
import { Gallery } from "@/components/site/gallery";
import { Booking } from "@/components/site/booking";
import { Footer } from "@/components/site/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "DJ Abdul",
  jobTitle: "DJ & Producer",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  description: SITE_DESCRIPTION,
  email: "mailto:djabdul23@gmail.com",
  telephone: "+91 88673 36482",
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  knowsAbout: ["Bollywood remixes", "Latin", "Tribal", "Progressive house"],
  sameAs: [
    "https://www.instagram.com/djabdulindia/",
    "https://soundcloud.com/djabdulindia",
    "https://www.youtube.com/channel/UCx2W91p0j2Kj6LKh56HMmEQ",
    "https://www.facebook.com/djabdulindia",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <GenreMarquee />
        <About />
        <Journey />
        <Sound />
        <Videos />
        <Gallery />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
