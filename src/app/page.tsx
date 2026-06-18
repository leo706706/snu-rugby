import ScrollHero from "@/components/home/ScrollHero";
import PlayersPreview from "@/components/home/PlayersPreview";
import SchedulePreview from "@/components/home/SchedulePreview";
import NoticesPreview from "@/components/home/NoticesPreview";
import InstagramFeed from "@/components/home/InstagramFeed";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <ScrollHero />
      <PlayersPreview />
      <SchedulePreview />
      <NoticesPreview />
      <InstagramFeed />
    </>
  );
}
