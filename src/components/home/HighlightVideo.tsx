export default function HighlightVideo() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-black shadow-xl">
          <video
            src="/videos/hero.mp4"
            controls
            playsInline
            className="aspect-video w-full"
          />
        </div>
      </div>
    </section>
  );
}
