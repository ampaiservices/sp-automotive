import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { DrivingSection } from "./components/sections/DrivingSection";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      {/*
       * SmokyTransition removed for now (user is swapping in a replacement).
       * The driving section now sits directly below the hero — the bird's-
       * eye car waits in the upper portion of that section, becoming sticky
       * once the column scrolls past 50vh. To re-enable: re-import
       * `SmokyTransition` from "./components/sections/SmokyTransition" and
       * render <SmokyTransition /> between <Hero /> and <DrivingSection />.
       */}
      <DrivingSection />
    </main>
  );
}
