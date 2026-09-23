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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
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
