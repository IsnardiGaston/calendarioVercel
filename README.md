# 🎉 Mes del Trabajador 2026 — Working&Co

**Next.js 15** + **Strapi Cloud** + **Vercel** + **Tailwind CSS** test

Landing page para 5k usuarios con calendario interactivo de eventos, pilares del programa y sorteo.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` ✅

Los datos vienen de **Strapi Cloud**. Si no está disponible, usa datos mock de `data/events.ts`.

## 📁 Estructura

```
.
├── app/                   # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/            # Componentes React
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Pilares.tsx
│   ├── Calendar.tsx
│   ├── Raffle.tsx
│   ├── Sedes.tsx
│   └── Footer.tsx
├── data/                  # Datos y configuración
│   ├── config.ts          # Colores, sedes, pilares
│   └── events.ts          # Tipos e eventos mock
├── lib/
│   └── strapi.ts          # Cliente Strapi
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔐 Configuración - Strapi Cloud

### Variables de entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=https://tuapplication.strapicloud.com
STRAPI_API_TOKEN=tu_token_aqui
```

**Dónde obtener:**
- **URL:** Strapi Cloud → Tu proyecto → Settings → API Configuration
- **Token:** Settings → API Tokens → Create new (custom)

### Estructura de datos en Strapi Cloud

Colección `eventos` con campos:

| Campo | Tipo |
|-------|------|
| `day` | Number (1-31) |
| `title` | String |
| `category` | Enumeration (cuerpo, mente, comuni) |
| `time` | String |
| `description` | Text |
| `sedes` | JSON |

## 🛠️ Comandos

```bash
npm run dev       # Desarrollo
npm run build     # Build
npm run start     # Producción
npm run lint      # Lint
```

## 🎨 Personalizar

### Colores

Edita `data/config.ts`:
```typescript
export const COLORS = {
  arena: '#eee6d3',
  teal: '#1f9ba0',
  pink: '#ee4887',
  // ...
}
```

### Sedes

```typescript
export const SEDES = [
  'Artilleros',
  'Virrey del Pino',
  // ...
]
```

### Pilares

En `data/config.ts`, modifica el array `PILARES`.

## 📱 Responsive

Mobile-first con breakpoints:
- Mobile: < 600px
- Tablet: 600px - 920px
- Desktop: > 920px

## 🚀 Deploy en Vercel

1. **Push a GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Crear proyecto en Vercel**
   - [Vercel Dashboard](https://vercel.com/dashboard) → Add New Project
   - Selecciona tu repositorio

3. **Configurar variables de entorno**
   - Settings → Environment Variables
   - Agrega:
     ```
     NEXT_PUBLIC_STRAPI_URL = https://tuapplication.strapicloud.com
     STRAPI_API_TOKEN = tu_token
     ```

4. **Deploy** ✅

Vercel desplegará automáticamente en cada push a `main`.

## 🔄 Cómo funciona

```
Usuario
  ↓
Vercel (Next.js)
  ↓ fetch
Strapi Cloud (CMS)
  ↓
Base de datos
```

- Los datos se cachean **1 hora** (configurable en `lib/strapi.ts`)
- Si Strapi no está disponible, usa datos mock automáticamente
- Responde a filtros de sedes y categorías en tiempo real

## 📚 Documentación

- [STEPS_STRAPI_CLOUD.md](STEPS_STRAPI_CLOUD.md) — Guía paso a paso
- [STRAPI_CLOUD_SETUP.md](STRAPI_CLOUD_SETUP.md) — Setup detallado
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Error fetching events" | Strapi Cloud no disponible o token inválido |
| Port 3000 ocupado | `npm run dev -- -p 3001` |
| Cambios no aparecen | Reinicia dev server o limpia `.next/` |
| TypeScript errors | `npm install` nuevamente |

## 📊 Límites Strapi Cloud Free

- 100,000 registros ✅
- 5 MB almacenamiento ✅
- Usuarios ilimitados ✅
- Requests ilimitados ✅

**Para 5k usuarios + eventos de mayo: Suficiente**

---

Desarrollado con ❤️ para Working&Co
