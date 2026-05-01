# Configuración de Masterclasses en Strapi

## Crear Collection Type en Strapi

### 1. Crea un nuevo Collection Type llamado: `masterclass` (singular)

En Strapi Admin:
- Vé a Content-Type Builder
- Click en "Create new collection type"
- Nombre: `masterclass` (singular)

### 2. Agrega los siguientes campos:

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `initials` | Short Text | Sí | Ej: "NF" |
| `presenter` | Short Text | Sí | Ej: "Nico Fernández Miranda" |
| `date` | Short Text | Sí | Formato: "18 / 05" |
| `topic` | Short Text | Sí | Ej: "CONCENTRACIÓN" |
| `title` | Text | Sí | Título largo del masterclass |
| `description` | Long Text / Rich Text | Sí | Descripción del contenido |
| `category` | Short Text | Sí | Ej: "Neurociencia aplicada" |
| `image` | Media | No | Foto del presentador |
| `iconType` | Enumeration | Sí | Valores: `circles`, `smiles`, `clock` |

### 3. Estructura completa en JSON (para Strapi Content API):

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "initials": "NF",
        "presenter": "Nico Fernández Miranda",
        "date": "18 / 05",
        "topic": "CONCENTRACIÓN",
        "title": "Atención bajo amenaza: por qué se te escapa el foco y cómo recuperarlo",
        "description": "Trabajás más horas que nunca y rendís menos que antes. Te muestro qué le está pasando a tu cerebro y qué dice la evidencia para volver a concentrarte.",
        "category": "Neurociencia aplicada",
        "iconType": "circles",
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/nico_1234567890.jpg"
            }
          }
        }
      }
    },
    {
      "id": 2,
      "attributes": {
        "initials": "NF",
        "presenter": "Nico Fernández Miranda",
        "date": "19 / 05",
        "topic": "HÁBITOS",
        "title": "Arrancás siempre, terminás nunca: la neurociencia de los hábitos que no aguantan",
        "description": "La motivación dura tres semanas; un sistema bien diseñado dura años. Vamos a ver qué tiene que pasar en tu cerebro para que un hábito se instale de verdad.",
        "category": "Neurociencia aplicada",
        "iconType": "smiles",
        "image": {
          "data": {
            "id": 2,
            "attributes": {
              "url": "/uploads/nico_smiles_1234567890.jpg"
            }
          }
        }
      }
    },
    {
      "id": 3,
      "attributes": {
        "initials": "NF",
        "presenter": "Nico Fernández Miranda",
        "date": "20 / 05",
        "topic": "PROCRASTINACIÓN",
        "title": "Sé lo que tengo que hacer, pero no me sale: la mecánica neuronal de postergar",
        "description": "Procrastinar no es vagancia ni falta de carácter, es una respuesta emocional con un mapa cerebral preciso. Vas a entender por qué tu cerebro frena justo cuando más necesitás avanzar.",
        "category": "Neurociencia aplicada",
        "iconType": "clock",
        "image": {
          "data": {
            "id": 3,
            "attributes": {
              "url": "/uploads/nico_clock_1234567890.jpg"
            }
          }
        }
      }
    }
  ]
}
```

## Colores asignados automáticamente (en el componente)

Los colores se asignan por índice de orden, no por campo en Strapi:

| Índice | Color | Hex |
|--------|-------|-----|
| 0 | Teal | rgb(31, 143, 143) |
| 1 | Orange | rgb(217, 119, 87) |
| 2 | Gold | rgb(201, 162, 39) |
| 3+ | Se repite desde índice 0 | - |

## Iconos disponibles

- **circles**: 3 círculos concéntricos
- **smiles**: Sonrisas/arcos (para hábitos)
- **clock**: Reloj / timer (para procrastinación)

## Testing

Una vez creado el tipo en Strapi, haz una request:

```bash
curl "http://localhost:1337/api/masterclasses?populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Notas

- Los colores se asignan automáticamente basado en el orden en la respuesta
- El componente soporta N cantidad de masterclasses (no está limitado a 3)
- Las imágenes son opcionales (mostrará solo el color de fondo si no hay imagen)
- Los iconTypes deben ser uno de: `circles`, `smiles`, `clock`
