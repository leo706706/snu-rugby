import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-700">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900" />
      <div className="container-page relative flex min-h-[70vh] flex-col items-start justify-center py-24 text-white">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-navy-200">
          Seoul National University
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tightish sm:text-6xl">
          서울대학교 럭비부
        </h1>
        <p className="mt-6 max-w-md text-base text-navy-100 sm:text-lg">
          도전과 협동의 정신으로 그라운드를 누비는 SNU RUGBY입니다.
        </p>
        <div className="mt-10 flex gap-3">
          <Link
            href="/players"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy-50"
          >
            선수단 보기
          </Link>
          <Link
            href="/schedule"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            경기 일정
          </Link>
        </div>
      </div>
    </section>
  );
}
