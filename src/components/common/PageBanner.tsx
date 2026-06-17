import Image from "next/image";

export default function PageBanner({
  imageUrl,
  title,
  subtitle,
}: {
  imageUrl: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative flex h-64 items-center overflow-hidden sm:h-80">
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        className="object-cover brightness-[0.45]"
      />
      <div className="container-page relative z-10 text-white">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}
