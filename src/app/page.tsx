import HeroBanner from "@/components/home/HeroBanner";
import PlayersPreview from "@/components/home/PlayersPreview";
import SchedulePreview from "@/components/home/SchedulePreview";
import NoticesPreview from "@/components/home/NoticesPreview";
import InstagramFeed from "@/components/home/InstagramFeed";
import { getBanner } from "@/lib/data/banners";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroImage = await getBanner("home");

  return (
    <>
      <HeroBanner imageUrl={heroImage} />
      <PlayersPreview />
      <SchedulePreview />
      <NoticesPreview />
      <InstagramFeed />
    </>
  );
}
