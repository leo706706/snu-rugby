import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="bg-white">
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-navy">
          Seoul National University
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-tightish text-neutral-900 sm:text-7xl">
          서울대학교 럭비부
        </h1>
        <p className="mt-6 max-w-md text-base text-neutral-500 sm:text-lg">
          도전과 협동의 정신으로 그라운드를 누비는 SNU RUGBY입니다.
        </p>
        <div className="mt-10 flex gap-3">
          <Link
            href="/players"
            className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-700"
          >
            선수단 보기
          </Link>
          <Link
            href="/schedule"
            className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            경기 일정
          </Link>
        </div>
      </div>
    </section>
  );
}
