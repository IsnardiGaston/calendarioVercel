# Setup de Strapi CMS

Guía para instalar y configurar Strapi para el proyecto.

## 📦 Instalación

### Opción 1: Crear nueva instancia Strapi (recomendado)

En la **raíz del proyecto:**

```bash
npx create-strapi-app@latest strapi
cd strapi
npm run develop
```

Strapi abrirá en `http://localhost:1337`

### Opción 2: Usar Strapi existente

Si ya tienes un Strapi running, configura las variables de entorno en `web/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token
```

## 🏗️ Crear la estructura de datos

### 1. Colección `eventos`

En Strapi → **Content-Type Builder** → **Create new Collection Type**

**Configuración:**
- **Display name:** `Evento`
- **API ID:** `evento`
- **Table name:** `eventos`

### 2. Agregar campos

| Campo | Tipo | Requerido | Opciones |
|-------|------|-----------|----------|
| `day` | Number | ✅ | Min: 1, Max: 31 |
| `title` | String | ✅ | |
| `category` | Enumeration | ✅ | `cuerpo`, `mente`, `comuni` |
| `time` | String | ✅ | |
| `description` | Text | ✅ | |
| `sedes` | Relation | ✅ | Many-to-Many con `sedes` |

### 3. Colección `sedes` (opcional)

Si quieres gestionar sedes desde Strapi:

**Configuración:**
- **Display name:** `Sede`
- **API ID:** `sede`

**Campos:**
- `name`: String

Luego en `eventos`, cambiar `sedes` a relación con esta colección.

### 4. Guardar y reconfigurarse

Clickear **Save** → Strapi se reiniciará automáticamente.

## 🔐 Crear API Token

1. **Settings** (⚙️ abajo a la izquierda)
2. **API Tokens**
3. **Create new API Token**
4. **Configuración:**
   - **Name:** `Next.js Production`
   - **Description:** `Token para Next.js Vercel`
   - **Type:** `Custom`
   - **Permissions:** 
     - `eventos` → `find`, `findOne`
     - (opcional) `sedes` → `find`, `findOne`

5. **Create** → **Copiar el token**

⚠️ **No podrás ver el token de nuevo!**

## 📝 Agregar eventos

### Manualmente en Strapi

1. **Content Manager** → **Eventos**
2. **Create new entry**
3. Llenar los campos:

```
day: 5
title: Degustacion de Te
category: comuni
time: A confirmar
description: Una experiencia sensorial para empezar el martes con calma.
sedes: Seleccionar "Virrey del Pino"
```

4. **Save** → **Publish** (importante!)

### Importar datos en bulk

Usa `strapi-plugin-import-export` o un script NodeJS para importar datos masivos.

## 🖥️ Variables de entorno

### Desarrollo local (`web/.env.local`)

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=tu_token_aqui
```

### Producción en Vercel

En [Vercel Dashboard](https://vercel.com) → Settings → Environment Variables:

```
NEXT_PUBLIC_STRAPI_URL = https://tu-strapi-produccion.com
STRAPI_API_TOKEN = token_produccion
```

## ✅ Verificar conexión

1. Iniciar Strapi: `npm run develop`
2. Iniciar Next.js: `cd web && npm run dev`
3. Ir a `http://localhost:3000`
4. Ver si carga los eventos desde Strapi

Si falla, checkear:
- ¿Strapi está running? (`http://localhost:1337`)
- ¿Token es válido?
- ¿La colección está creada?
- ¿Los eventos están publicados?

## 🚀 Deploy de Strapi

### Opción A: Railway (recomendado)

1. [Railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Conectar tu repo
3. Agregar PostgreSQL o MySQL
4. Variables de entorno (Railway genera las del DB)
5. Deploy ✅

Strapi estará en algo como: `https://tu-app-rail.railway.app`

### Opción B: Heroku

```bash
cd strapi
heroku create tu-app
git push heroku main
```

### Opción C: Render.com

Similar a Railway, muy simple.

## 🔗 Estructura final

```
Vercel (Frontend)
    ↓ fetch
Strapi Production (Backend)
    ↓ get
Database (PostgreSQL/MySQL)
```

---

¿Preguntas? Ver [Frontend README](web/README.md) o [Main README](README.md)
