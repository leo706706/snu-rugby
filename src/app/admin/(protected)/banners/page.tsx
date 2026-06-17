import { getBannerMap } from "@/lib/data/banners";
import BannerManager from "@/components/admin/BannerManager";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await getBannerMap();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">페이지 배너</h1>
      <p className="mt-2 text-sm text-neutral-500">
        각 페이지 상단에 보여지는 메인 이미지를 변경할 수 있습니다.
      </p>

      <div className="mt-6">
        <BannerManager banners={banners} />
      </div>
    </div>
  );
}
