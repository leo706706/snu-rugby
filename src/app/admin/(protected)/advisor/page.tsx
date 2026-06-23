import { getAdvisor } from "@/lib/data/advisor";
import AdvisorForm from "@/components/admin/AdvisorForm";

export const dynamic = "force-dynamic";

export default async function AdminAdvisorPage() {
  const advisor = await getAdvisor();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">지도교수</h1>
      <p className="mt-2 text-sm text-neutral-500">
        선수단 페이지에 표시되는 지도교수 정보를 관리합니다. 이름을 비워두면 섹션이 표시되지 않습니다.
      </p>

      <div className="mt-6">
        <AdvisorForm initial={advisor} />
      </div>
    </div>
  );
}
