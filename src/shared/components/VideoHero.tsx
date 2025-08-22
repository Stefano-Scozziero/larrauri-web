// src/shared/components/VideoHero.tsx
export function VideoHero() {
  return (
    <section className="relative bg-black">
      <div className="relative min-h-[65svh] sm:min-h-[70svh] md:min-h-[75vh]">
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
        <div className="absolute inset-0 z-10 flex items-end justify-end p-4 md:p-10 pb-8 md:pb-12">
          <div className="text-right">
            <h1 className="font-medium text-white text-3xl md:text-5xl tracking-tight drop-shadow leading-tight">
              Carne Argentina
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
