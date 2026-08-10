import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Zones from "@/components/Zones";
import Format from "@/components/Format";
import Bracket from "@/components/Bracket";
import Trophy from "@/components/Trophy";
import Fixtures from "@/components/Fixtures";
import Gallery from "@/components/Gallery";
import Committee from "@/components/Committee";
import Sponsors from "@/components/Sponsors";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Zones />
        <Format />
        <Bracket />
        <Trophy />
        <Fixtures />
        <Gallery />
        <Committee />
        <Sponsors />
        <Register />
      </main>
      <Footer />
    </>
  );
}
