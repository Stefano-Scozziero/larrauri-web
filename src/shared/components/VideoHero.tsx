// src/shared/components/VideoHero.tsx
export function VideoHero() {
  return (
    <section className="relative bg-black">
      <div className="relative h-[50vh] md:h-[75vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/bovinos.mp4"
          poster="/bovinos.png"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay con slogan */}
        <div className="absolute inset-0 z-10 flex items-end justify-end p-4 md:p-10">
          <div className="text-right">
            <h1 className="font-shantell text-white text-3xl md:text-5xl tracking-tight drop-shadow underline underline-offset-4">
  Carne Argentina
</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
