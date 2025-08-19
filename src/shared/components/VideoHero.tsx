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
        {/* Overlay con slogan */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white text-3xl md:text-5xl font-serif tracking-tight">
              Larrauri: Carne Argentina de excelencia
            </h1>
            <p className="mt-3 text-white/90 max-w-2xl mx-auto">
              Más de 100 años produciendo carnes de excelencia, con control total de la cadena productiva.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
