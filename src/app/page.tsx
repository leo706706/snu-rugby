import ScrollHero from "@/components/home/ScrollHero";
import PlayersPreview from "@/components/home/PlayersPreview";
import SchedulePreview from "@/components/home/SchedulePreview";
import NoticesPreview from "@/components/home/NoticesPreview";
import InstagramFeed from "@/components/home/InstagramFeed";
import { getBanner } from "@/lib/data/banners";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroImage = await getBanner("home");
  const frames = [heroImage, "/images/rugby_08.jpg", "/images/rugby_138.jpg", "/images/rugby_62.jpg"];

  return (
    <>
      <ScrollHero frames={frames} />
      <PlayersPreview />
      <SchedulePreview />
      <NoticesPreview />
      <InstagramFeed />
    </>
  );
}
