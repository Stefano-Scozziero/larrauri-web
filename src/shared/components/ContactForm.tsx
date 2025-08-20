// src/shared/components/ContactForm.tsx
import { useState } from 'react'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', hp: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const onChange =
    (field: 'name' | 'email' | 'message') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!r.ok) throw new Error((await r.json()).error || 'Error desconocido')
      setStatus('sent')
      setForm({ name: '', email: '', message: '', hp: '' })
    } catch (err: any) {
      setStatus('error')
      setError(err.message || 'No se pudo enviar el mensaje')
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-xl">
      {/* Honeypot invisible para bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={form.hp}
        onChange={(e) => setForm((f) => ({ ...f, hp: e.target.value }))}
        className="hidden"
        aria-hidden
      />

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Nombre</span>
        <input
          value={form.name}
          onChange={onChange('name')}
          className="mt-1 w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={onChange('email')}
          className="mt-1 w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Mensaje</span>
        <textarea
          value={form.message}
          onChange={onChange('message')}
          className="mt-1 w-full border rounded-2xl px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          required
        />
      </label>

      <button className="btn-primary disabled:opacity-60" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : 'Enviar'}
      </button>

      {status === 'sent' && (
        <p className="mt-4 text-green-600">¡Gracias! Te responderemos a la brevedad.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600">Hubo un problema: {error}</p>
      )}
    </form>
  )
}
