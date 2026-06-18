import { getBanner } from "@/lib/data/banners";
import HeroBanner from "@/components/home/HeroBanner";
import VideoPopup from "@/components/home/VideoPopup";
import PlayersPreview from "@/components/home/PlayersPreview";
import SchedulePreview from "@/components/home/SchedulePreview";
import NoticesPreview from "@/components/home/NoticesPreview";
import InstagramFeed from "@/components/home/InstagramFeed";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bannerImage = await getBanner("home");

  return (
    <>
      <HeroBanner imageUrl={bannerImage} />
      <VideoPopup />
      <PlayersPreview />
      <SchedulePreview />
      <NoticesPreview />
      <InstagramFeed />
    </>
  );
}
