// /api/contact.js
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO   = process.env.CONTACT_TO_EMAIL
const FROM = process.env.CONTACT_FROM_EMAIL // remitente VERIFICADO en Resend

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, message, hp } = req.body || {}
  if (hp) return res.status(204).end()
  if (!name || !email || !message) return res.status(400).json({ error: 'Faltan campos' })

  try {
    await resend.emails.send({
      from: FROM,
      to: [TO],
      // Resend acepta `replyTo` (camelCase) en la versión actual
      replyTo: email,
      subject: `Nuevo mensaje desde la web: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'No se pudo enviar el email' })
  }
}
