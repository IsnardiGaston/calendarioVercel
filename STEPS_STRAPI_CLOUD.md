# ✅ Pasos exactos para Strapi Cloud

Sigue estos pasos en orden. **5-10 minutos total.**

## Paso 1️⃣: Crear cuenta en Strapi Cloud (2 min)

1. Abre https://strapi.cloud
2. Clickea **Sign Up**
3. Registrate con GitHub o email
4. Crea tu primer proyecto → Selecciona **Free Plan**
5. Espera 2-3 minutos mientras se crea

✅ Verás tu dashboard con un proyecto

## Paso 2️⃣: Crear colección `eventos` (3 min)

En tu proyecto Strapi Cloud:

1. Click en **Content-Type Builder** (menú izquierdo)
2. **Create new Collection Type**
3. **Display name:** `Evento`
4. Click **Continue**
5. **Add field** 5 veces:

| # | Field name | Type | Required |
|---|------------|------|----------|
| 1 | day | Number | ✅ |
| 2 | title | String (short text) | ✅ |
| 3 | category | Enumeration | ✅ |
| 4 | time | String | ✅ |
| 5 | description | Text (long text) | ✅ |
| 6 | sedes | JSON | ✅ |

**Para `category` (Enumeration):**
- Agregar valor: `cuerpo`
- Agregar valor: `mente`
- Agregar valor: `comuni`

6. Click **Save**

✅ Se reconfigura automáticamente

## Paso 3️⃣: Obtener API Token (1 min)

En Strapi Cloud:

1. Click **Settings** (⚙️ abajo en el menú)
2. Click **API Tokens**
3. **Create new API Token**
4. **Name:** `Next.js`
5. **Type:** `Custom`
6. **Permissions:**
   - Checkbox `evento` → marcar `find` y `findOne`
7. Click **Create**
8. **COPIA EL TOKEN** (no lo verás de nuevo)

✅ Token en el portapapeles

## Paso 4️⃣: Configurar Frontend (2 min)

En tu carpeta `web/`:

```bash
cp .env.example .env.local
```

Abre `.env.local` y edita:

```env
NEXT_PUBLIC_STRAPI_URL=https://tuapplication.strapicloud.com
STRAPI_API_TOKEN=el_token_que_copiaste
```

**Dónde está tu URL:**
- Strapi Cloud → Tu proyecto → Settings → API Configuration
- Verás algo como: `https://xxxx.strapicloud.com`

✅ Variables guardadas

## Paso 5️⃣: Ejecutar en desarrollo (1 min)

```bash
cd web
npm install
npm run dev
```

Abre http://localhost:3000 en el navegador

✅ Si ves la web, funcionó. Los datos vienen de Strapi Cloud.

## Paso 6️⃣: Agregar eventos en Strapi Cloud (2 min)

Vuelve a Strapi Cloud:

1. Click **Content Manager** (menú izquierdo)
2. Click **Evento**
3. Click **Create new entry**
4. Llena los datos:

```
day: 4
title: Hoy festejamos tu dia con Churros
category: comuni
time: A confirmar
description: Celebramos el Dia del Trabajador
sedes: ["Artilleros", "Virrey del Pino", "Salvador", "Soler", "Loyola", "Niceto"]
```

5. Click **Save**
6. Click **Publish** (importante!)

Repite para cada evento que quieras agregar.

✅ Los datos aparecen automáticamente en http://localhost:3000

## Paso 7️⃣: Deploy en Vercel (3 min)

### 7A: Push a GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 7B: Deploy en Vercel

1. Abre https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Importa tu repositorio de GitHub
4. **Root Directory:** `web`
5. Click **Environment Variables**
6. Agrega 2 variables:
   - `NEXT_PUBLIC_STRAPI_URL` = tu URL de Strapi Cloud
   - `STRAPI_API_TOKEN` = tu token
7. Click **Deploy**

Espera 1-2 minutos...

✅ Tu web está en vivo en `https://tu-proyecto.vercel.app`

---

## ✨ ¡Listo!

Tu web está:
- ✅ Corriendo en Vercel
- ✅ Conectada a Strapi Cloud
- ✅ Pronta para 5k usuarios

**Próximos pasos:**
- Agregar más eventos en Strapi Cloud
- Editar contenido directamente en Strapi Cloud
- Los cambios se reflejan automáticamente en la web (cada 1 hora)

---

**¿Problema?** Ver [STRAPI_CLOUD_SETUP.md](STRAPI_CLOUD_SETUP.md) para detalles.
