# ⚡ 5 minutos para empezar

## Opción 1: Solo frontend (sin Strapi)

**Terminal:**
```bash
cd web
npm install
npm run dev
```

Abre `http://localhost:3000` ✅

Los datos vienen del mock en `web/data/events.ts`.

## Opción 2: Frontend + Strapi Cloud ⭐ (Recomendado para producción)

**1. Crea cuenta en Strapi Cloud:**
https://strapi.cloud → Sign Up → Crear proyecto Free

**2. Crea la colección `eventos`:**
- Content-Type Builder → Create Collection
- Agregar campos: day, title, category, time, description, sedes

**3. Obtén el API Token:**
- Settings → API Tokens → Create new
- Copiar token

**4. Configura Frontend:**
```bash
cd web
npm install
cp .env.example .env.local
# Edita .env.local con tu URL y token de Strapi Cloud
npm run dev
```

**5. Deploy en Vercel:**
- Push a GitHub
- Vercel Dashboard → Settings → Environment Variables
- Agrega NEXT_PUBLIC_STRAPI_URL y STRAPI_API_TOKEN
- Deploy ✅

[Ver guía completa](STRAPI_CLOUD_SETUP.md)

## Opción 3: Frontend + Strapi local (desarrollo)

**Terminal 1:**
```bash
npx create-strapi-app@latest strapi
cd strapi && npm run develop
```

**Terminal 2:**
```bash
cd web && npm install && npm run dev
```

---

**Documentación completa:**
- **[Pasos exactos para Strapi Cloud](STEPS_STRAPI_CLOUD.md)** ⭐ Sigue esto paso a paso
- [Frontend](web/README.md)
- [Strapi Cloud detallado](STRAPI_CLOUD_SETUP.md)
- [Main](README.md)
