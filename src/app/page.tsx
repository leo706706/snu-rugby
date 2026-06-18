import { getBannerData } from "@/lib/data/banners";
import HeroBanner from "@/components/home/HeroBanner";
import HighlightVideo from "@/components/home/HighlightVideo";
import PlayersPreview from "@/components/home/PlayersPreview";
import SchedulePreview from "@/components/home/SchedulePreview";
import NoticesPreview from "@/components/home/NoticesPreview";
import InstagramFeed from "@/components/home/InstagramFeed";
import GalleryPreview from "@/components/home/GalleryPreview";

export const dynamic = "force-dynamic";

export default async function Home() {
  const banner = await getBannerData("home");

  return (
    <>
      <HeroBanner
        imageUrl={banner.imageUrl}
        positionDesktop={banner.positionDesktop}
        positionMobile={banner.positionMobile}
      />
      <HighlightVideo />
      <PlayersPreview />
      <SchedulePreview />
      <NoticesPreview />
      <InstagramFeed />
      <GalleryPreview />
    </>
  );
}
