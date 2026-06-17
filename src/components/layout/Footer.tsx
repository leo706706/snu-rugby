import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-navy-100">
      <div className="container-page flex flex-col gap-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-semibold text-white">SNU RUGBY</p>
          <p className="mt-2 text-sm text-navy-200">서울대학교 럭비부</p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-navy-200">
          <a
            href="https://www.instagram.com/snu__rugby/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Instagram @snu__rugby
          </a>
          <Link href="/admin/login" className="hover:text-white">
            관리자
          </Link>
        </div>
      </div>
      <div className="container-page border-t border-navy-600 py-4 text-xs text-navy-300">
        © {new Date().getFullYear()} SNU Rugby Football Club. All rights reserved.
      </div>
    </footer>
  );
}
