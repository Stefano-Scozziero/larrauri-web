# Larrauri Web — React + Vite + TS

Arquitectura limpia y escalable con módulos (Home, Producto, Contacto), Tailwind para estilos y React Router con carga diferida (code splitting).

## Requisitos
- Node.js 18+
- pnpm (recomendado) o npm/yarn

## Scripts
```bash
pnpm install
pnpm dev       # entorno local
pnpm build     # build producción
pnpm preview   # ver build
```

## Estructura
```
src/
  features/
    home/
    product/
    contact/
  shared/          # componentes compartidos
  shell/           # layout principal (AppShell)
  router.tsx
  main.tsx
```

## Estilos y paleta
Colores de marca cargados en Tailwind: `brand.blue`, `brand.red`, `brand.neutral`, `brand.black`.

## Extender con nuevos módulos
1. Crear carpeta `src/features/<modulo>` con `ModuloPage.tsx`.
2. Registrar ruta en `router.tsx` con `lazyRouteComponent`.
3. (Opcional) Añadir estado o fetching con React Query.
