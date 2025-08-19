export function Section(props: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={props.id} className="container-max py-10 anchor-offset" data-observe="section">
      {props.title && <h2 className="text-2xl font-serif text-brand-blue mb-6">{props.title}</h2>}
      <div className="grid gap-6">{props.children}</div>
    </section>
  )
}