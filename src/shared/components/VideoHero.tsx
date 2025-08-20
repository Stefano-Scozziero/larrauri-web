export function VideoHero() {
  return (
    <section className="relative bg-black">
      <div className="relative h-[50vh] md:h-[75vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/bovinos2.mp4"
          poster="/bovinos.png"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  )
}
