import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900 sm:text-3xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-neutral-500">
        주소가 잘못되었거나 삭제된 페이지일 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-700"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
