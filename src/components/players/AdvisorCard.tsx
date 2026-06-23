import Image from "next/image";
import type { Advisor } from "@/types/database";

export default function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-navy-50 bg-white p-6 sm:flex-row">
      <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-xl bg-navy-50">
        {advisor.photo_url ? (
          <Image src={advisor.photo_url} alt={advisor.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-semibold text-navy-200">
            {advisor.name.slice(0, 1)}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">지도교수</p>
        <h3 className="mt-1 text-xl font-semibold text-neutral-900">{advisor.name}</h3>
        {advisor.title && <p className="mt-1 text-sm text-neutral-500">{advisor.title}</p>}
        {advisor.career && (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
            {advisor.career}
          </p>
        )}
      </div>
    </div>
  );
}
