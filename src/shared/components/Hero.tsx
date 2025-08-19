export function Hero(props: { title: string; subtitle?: string; cta?: React.ReactNode }) {
  return (
    <section className="bg-gradient-to-br from-brand-neutral to-white">
      <div className="container-max py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-brand-blue">{props.title}</h1>
        {props.subtitle && <p className="mt-4 text-lg text-gray-700 max-w-2xl">{props.subtitle}</p>}
        {props.cta && <div className="mt-8">{props.cta}</div>}
      </div>
    </section>
  )
}
