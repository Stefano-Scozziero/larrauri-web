import { Section } from '../../shared/components/Section'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <Section title="Contacto">
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true) }}
        className="card max-w-xl"
      >
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Nombre</span>
          <input className="mt-1 w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Email</span>
          <input type="email" className="mt-1 w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Mensaje</span>
          <textarea className="mt-1 w-full border rounded-2xl px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
        </label>

        <button className="btn-primary" type="submit">Enviar</button>
        {sent && <p className="mt-4 text-green-600">¡Gracias! Te responderemos a la brevedad.</p>}
      </form>
    </Section>
  )
}
