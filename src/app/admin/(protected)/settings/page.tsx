import { getSiteSettings } from "@/lib/data/settings";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">사이트 설정</h1>
      <p className="mt-2 text-sm text-neutral-500">
        인스타그램 링크 등 사이트 전역에서 쓰이는 정보를 변경할 수 있습니다.
      </p>

      <div className="mt-6">
        <SiteSettingsForm
          instagramUrl={settings.instagramUrl}
          instagramHandle={settings.instagramHandle}
        />
      </div>
    </div>
  );
}
