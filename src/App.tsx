import { useEffect, useState } from "react";
import { wedding } from "./data/wedding";
import { useMusic } from "./hooks/useMusic";
import { Countdown } from "./components/Countdown";
import { CoupleStory } from "./components/CoupleStory";
import { EventDetails } from "./components/EventDetails";
import { EventTimeline } from "./components/EventTimeline";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { InvitationIntro } from "./components/InvitationIntro";
import { MusicPlayer } from "./components/MusicPlayer";
import { Nav } from "./components/Nav";

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic(wedding.music.src);

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  const open = (withMusic: boolean) => {
    setOpened(true);
    window.scrollTo(0, 0);
    if (music.available && (withMusic || music.wasOn())) music.play();
  };

  return (
    <>
      <InvitationIntro open={opened} onOpen={open} musicAvailable={music.available} />
      <div inert={!opened}>
        <Nav />
        <main>
          <Hero />
          <Countdown />
          <EventTimeline />
          <EventDetails />
          <CoupleStory />
          <Gallery />
        </main>
        <Footer />
        {music.available && <MusicPlayer playing={music.playing} onToggle={music.toggle} />}
      </div>
    </>
  );
}
