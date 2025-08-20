// src/shared/components/WhatsAppFAB.tsx
import { CONTACT } from '../../config/contact'

export function WhatsAppFAB() {
  const digits = CONTACT.phone.replace(/\D/g, '')
  const href =
    CONTACT.waLink ||
    `https://wa.me/${digits}?text=${encodeURIComponent(CONTACT.defaultMsg)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
      style={{ backgroundColor: '#189d0e' }}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor" aria-hidden>
        <path d="M20 3.5A10.5 10.5 0 0 0 3.1 17.6L2 22l4.6-1.1A10.5 10.5 0 1 0 20 3.5Z" />
        <path d="M16.7 14.7c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-2.2c-.1-.3 0-.5.1-.7l.3-.5.1-.3c.1-.3 0-.5 0-.7l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.1-1.2 2.7 0 1.6 1.2 3.2 1.3 3.4.2.2 2.4 3.7 5.8 5.1 3.5 1.5 3.6 1 4.3 1 .7 0 2.2-.8 2.5-1.6.3-.8.3-1.5.2-1.6 0-.1-.3-.2-.6-.4Z" fill="#189d0e" />
      </svg>
    </a>
  )
}
