// src/shared/components/WhatsAppContact.tsx
import { CONTACT } from '../../config/contact'
import waPng from '../../assets/whatsapp.png'

type Props = { className?: string; title?: string }

export function WhatsAppContact({ className = '', title = 'Contacto' }: Props) {
  const digits = CONTACT.phone.replace(/\D/g, '')

  // usa wa.me automáticamente si no hay waLink (o viene vacío)
  const waHref =
    CONTACT.waLink?.trim()
      ? CONTACT.waLink.trim()
      : `https://wa.me/${digits}?text=${encodeURIComponent(CONTACT.defaultMsg)}`

  return (
    <section
      aria-labelledby="whatsapp-contact-title"
      className={`relative overflow-hidden rounded-2xl bg-[#1f2937] text-white p-8 md:p-10 ${className}`}
    >
      {/* fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(1200px 400px at 50% -10%, rgba(255, 255, 255, 0.12), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <h2
          id="whatsapp-contact-title"
          className="titulo text-center text-2xl font-semibold tracking-tight md:text-3xl mb-10"
        >
          {title}
        </h2>

        {/* layout principal: icono/CTA + datos */}
        <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
          {/* Columna izquierda: icono + botón (centrados uno respecto del otro) */}
          <div className="flex flex-col items-center text-center">
            <a
              href={waHref}
              aria-label="Chatear por WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto inline-flex items-center justify-center"
            >
              <img
                src={waPng}
                alt=""
                aria-hidden
                className="h-16 w-16 md:h-20 md:w-20 object-contain"
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
              />
            </a>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium shadow-lg ring-1 ring-white/10 hover:ring-white/20 focus:outline-none focus-visible:ring focus-visible:ring-green-400"
              style={{ backgroundColor: '#189d0e', color: '#111' }}
            >
              Escríbanos por WhatsApp
            </a>
          </div>

          {/* Columna derecha: datos dentro de una “tarjeta” */}
          <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur">
            <address className="not-italic leading-relaxed">
              {CONTACT.address.map((line, i) => (
                <p key={i}>{line}</p>
              ))}

              {CONTACT.mapsUrl && (
                <p className="mt-2">
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    Ver en Google Maps
                  </a>
                </p>
              )}
            </address>

            <div className="mt-4 divide-y divide-white/10">
              <div className="flex gap-3 py-2">
                <span className="w-20 shrink-0 text-gray-400">E-mail</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="underline underline-offset-4 break-all"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className="flex gap-3 py-2">
                <span className="w-20 shrink-0 text-gray-400">Tel.</span>
                <a href={`tel:${digits}`} className="hover:underline">
                  {CONTACT.phone}
                </a>
              </div>

              <div className="flex gap-3 py-2">
                <span className="w-20 shrink-0 text-gray-400">CUIT</span>
                <span>{CONTACT.cuit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
