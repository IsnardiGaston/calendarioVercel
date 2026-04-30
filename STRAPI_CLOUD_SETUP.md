# ☁️ Setup Strapi Cloud (Recomendado para este proyecto)

Guía rápida para usar Strapi Cloud con el plan gratuito.

## 🎯 Plan Gratuito - Límites

| Feature | Límite |
|---------|--------|
| Proyectos | 1 |
| Registros | 100,000 |
| Almacenamiento | 5 MB |
| Usuarios | Ilimitado |
| Requests API | Ilimitado |
| Soporte | Community |

**Para 5k usuarios + eventos de mayo:** ✅ Suficiente

## 🚀 Paso 1: Crear cuenta y proyecto

1. Ve a https://strapi.cloud
2. **Sign Up** (con GitHub o email)
3. **Create Project** → Selecciona plan **Free**
4. **Create Strapi Cloud Project** → Espera 2-3 minutos

## 📦 Paso 2: Crear la estructura de datos

Una vez que el proyecto esté listo:

### Colección `eventos`

1. **Content-Type Builder** (en el menú)
2. **Create new Collection Type**
3. **Display name:** `Evento`
4. **API ID:** `evento`

### Campos

| Campo | Tipo | Requerido |
|-------|------|-----------|
| `day` | Number | ✅ |
| `title` | String | ✅ |
| `category` | Enumeration | ✅ |
| `time` | String | ✅ |
| `description` | Text | ✅ |
| `sedes` | JSON | ✅ |

**Para `category`, agregar valores:**
- `cuerpo`
- `mente`
- `comuni`

**Para `sedes`, poner como array JSON:**
```json
["Artilleros", "Virrey del Pino", "Salvador", "Soler", "Loyola", "Niceto"]
```

4. **Save** → Se reconfigura automáticamente

## 🔐 Paso 3: Obtener API Token

1. **Settings** (⚙️)
2. **API Tokens** → **Create new API Token**
3. **Name:** `Next.js Frontend`
4. **Type:** `Custom`
5. **Permissions:** 
   - `eventos` → `find`, `findOne`
6. **Create** → **Copiar el token** (no se puede ver después)

## 📝 Paso 4: Configurar Frontend

En `web/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=https://tuapplication.strapicloud.com
STRAPI_API_TOKEN=tu_token_aqui
```

**Dónde está tu URL:**
- Strapi Cloud Dashboard → Tu proyecto → Settings → API Configuration
- Verás algo como: `https://xxxx.strapicloud.com`

## ✅ Paso 5: Verificar conexión

```bash
cd web
npm run dev
```

Abre `http://localhost:3000` y verifica que carga los eventos desde Strapi Cloud.

Si funciona ✅ → Los datos vienen de Strapi Cloud

Si falla → Checkear:
- ¿Token es correcto?
- ¿URL es correcta?
- ¿La colección está creada?

## 📝 Agregar eventos en Strapi Cloud

1. **Content Manager** → **Eventos**
2. **Create new entry**
3. Llenar:

```
day: 4
title: Hoy festejamos tu dia con Churros
category: comuni
time: A confirmar
description: Celebramos el Dia del Trabajador con churros
sedes: ["Artilleros", "Virrey del Pino", "Salvador", "Soler", "Loyola", "Niceto"]
```

4. **Save** → **Publish** (importante!)

## 🚀 Deploy en Vercel

### Variables de entorno

En [Vercel Dashboard](https://vercel.com):

1. Selecciona tu proyecto
2. **Settings** → **Environment Variables**
3. Agrega:

```
NEXT_PUBLIC_STRAPI_URL = https://tuapplication.strapicloud.com
STRAPI_API_TOKEN = tu_token
```

4. **Deploy** ✅

### Dominio custom en Strapi Cloud (opcional)

Si quieres usar tu propio dominio:
1. Strapi Cloud → Settings → Domains
2. Agregar tu dominio
3. Apuntar DNS según instrucciones

## 💾 Backup de datos

Strapi Cloud no tiene backups automáticos en free tier. **Recomendación:**

- Exporta datos regularmente:
  1. **Content Manager** → **Eventos**
  2. Menu → **Export**
  3. Descarga CSV/JSON

O simplemente puedes re-crear los datos manualmente en caso de necesidad (no son muchos).

## 🔄 Límites y escalado

**Cuando alcances los límites:**
- 100k registros llenos → Subir a plan Pro ($99/mes)
- 5 MB almacenamiento lleno → Plan Pro incluye más

Para 5k usuarios + eventos, **no deberías alcanzar los límites en mucho tiempo**.

## 🆘 Soporte

- **Community Support:** Discord, Forum
- **No hay email support en free tier**

## 📊 Arquitectura final

```
Usuarios (5k)
    ↓
Vercel Frontend (Next.js)
    ↓ fetch API
Strapi Cloud (Backend)
    ↓
Base de datos Strapi Cloud
```

---

**¿Siguientes pasos?**

1. Crear proyecto en Strapi Cloud ☁️
2. Crear colección `eventos`
3. Obtener API Token
4. Configurar `.env.local` en `web/`
5. Deploy en Vercel 🚀
