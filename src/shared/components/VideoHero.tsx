// src/shared/components/VideoHero.tsx
export function VideoHero() {
  return (
    <section className="relative bg-black">
      {/* Altura generosa; en mobile usa 50vh para que no sea excesivo */}
      <div className="relative h-[50vh] md:h-[75vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/bovinos.mp4"         // coloca tu video en public/hero.mp4
          poster="/bovinos.png"      // opcional: public/hero.jpg
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  )
}
