import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400">
      <div className="container-page flex flex-col gap-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/rugby_logo.png" alt="" width={32} height={32} className="h-8 w-8" />
          <div>
            <p className="text-base font-semibold text-white">SNU RUGBY</p>
            <p className="mt-1 text-sm text-neutral-500">서울대학교 럭비부</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-neutral-400">
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
      <div className="container-page border-t border-neutral-800 py-4 text-xs text-neutral-500">
        © {new Date().getFullYear()} SNU Rugby Football Club. All rights reserved.
      </div>
    </footer>
  );
}
