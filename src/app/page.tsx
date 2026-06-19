import { getBannerData } from "@/lib/data/banners";
import { getSiteSettings } from "@/lib/data/settings";
import HeroBanner from "@/components/home/HeroBanner";
import HighlightVideo from "@/components/home/HighlightVideo";
import PlayersPreview from "@/components/home/PlayersPreview";
import SchedulePreview from "@/components/home/SchedulePreview";
import NoticesPreview from "@/components/home/NoticesPreview";
import InstagramFeed from "@/components/home/InstagramFeed";
import GalleryPreview from "@/components/home/GalleryPreview";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [banner, { instagramUrl }] = await Promise.all([getBannerData("home"), getSiteSettings()]);

  return (
    <>
      <HeroBanner
        imageUrl={banner.imageUrl}
        instagramUrl={instagramUrl}
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
