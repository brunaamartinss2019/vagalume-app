# Vagalume App — API Documentation

> **Base URL:** `http://localhost:3000/api`  
> **Versión:** 1.1 — MVP actualizado  
> **Formato:** JSON  
> **Autenticación:** Sesiones con cookies (`withCredentials: true`)

---

## Tabla de contenidos

1. [Autenticación](#1-autenticación)
2. [Usuarios](#2-usuarios)
3. [Propiedades](#3-propiedades)
4. [Reservas](#4-reservas)
5. [Mensajes](#5-mensajes)
6. [Reseñas](#6-reseñas)
7. [Códigos de respuesta](#7-códigos-de-respuesta)
8. [Autenticación de rutas privadas](#8-autenticación-de-rutas-privadas)

---

## Convenciones

| Símbolo | Significado |
|---------|-------------|
| 🔓 | Ruta pública — no requiere sesión |
| 🔒 | Ruta privada — requiere cookie de sesión |
| 🟢 | Respuesta exitosa |
| 🔴 | Respuesta de error |

---

## 1. Autenticación

### `POST /users` 🔓
Crea una nueva cuenta de usuario.

**Body**
```json
{
  "name": "Marta García",
  "email": "marta@gmail.com",
  "password": "123456",
  "role": "guest"
}
```

| Campo | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| name | String | ✅ | Cualquier texto |
| email | String | ✅ | Email válido y único |
| password | String | ✅ | Mínimo 6 caracteres |
| role | String | ✅ | `guest` \| `host` \| `dual` |

**🟢 201 Created**
```json
{
  "id": "64abc123def456",
  "name": "Marta García",
  "email": "marta@gmail.com",
  "role": "guest",
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 409 Conflict** — email ya registrado
```json
{ "message": "Resource already exist" }
```

---

### `POST /sessions` 🔓
Inicia sesión con email y contraseña. Crea una cookie de sesión.

**Body**
```json
{
  "email": "marta@gmail.com",
  "password": "123456"
}
```

| Campo | Tipo | Requerido |
|-------|------|-----------|
| email | String | ✅ |
| password | String | ✅ |

**🟢 200 OK**
```json
{
  "id": "64abc123def456",
  "name": "Marta García",
  "email": "marta@gmail.com",
  "role": "guest"
}
```

**🔴 401 Unauthorized** — credenciales incorrectas
```json
{ "message": "Invalid credentials" }
```

---

### `DELETE /sessions` 🔒
Cierra la sesión del usuario y destruye la cookie.

**Body** — vacío

**🟢 204 No Content**

---

## 2. Usuarios

### `GET /users/me` 🔒
Devuelve el perfil del usuario autenticado.

**🟢 200 OK**
```json
{
  "id": "64abc123def456",
  "name": "Marta García",
  "email": "marta@gmail.com",
  "role": "guest",
  "avatar": "https://...jpg",
  "bio": "Viajera empedernida.",
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 401 Unauthorized** — sin sesión activa
```json
{ "message": "Unauthorized" }
```

---

### `GET /users/:id` 🔓
Devuelve el perfil público de un usuario. No expone email ni contraseña.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID del usuario |

**🟢 200 OK**
```json
{
  "id": "64def789abc123",
  "name": "Xoán López",
  "avatar": "https://...jpg",
  "role": "host",
  "bio": "Propietario en Rías Baixas.",
  "createdAt": "2026-01-15T10:00:00.000Z"
}
```

**🔴 404 Not Found**
```json
{ "message": "Resource not found" }
```

---

## 3. Propiedades

### `GET /properties` 🔓
Busca propiedades disponibles. Acepta filtros como query params.

**Query params** — todos opcionales

| Param | Tipo | Ejemplo | Descripción |
|-------|------|---------|-------------|
| ria | String | `Vigo` | Filtra por Ría (búsqueda parcial, insensible a mayúsculas) |
| capacity | Number | `2` | Número mínimo de huéspedes |
| type | String | `entire` | `entire` \| `room` |
| maxPrice | Number | `100` | Precio máximo por noche |
| checkIn | Date | `2026-07-01` | Fecha de entrada (informativo, no filtra disponibilidad) |
| checkOut | Date | `2026-07-05` | Fecha de salida (informativo, no filtra disponibilidad) |

**Ejemplo de llamada**
```
GET /api/properties?ria=vigo&capacity=2&maxPrice=150
```

**🟢 200 OK**
```json
[
  {
    "id": "64abc123def456",
    "title": "Casa en Baiona",
    "type": "entire",
    "price": 90,
    "capacity": 4,
    "photos": ["https://...jpg", "https://...jpg"],
    "rating": 4.5,
    "location": {
      "ria": "Ría de Vigo",
      "address": "Baiona, Pontevedra"
    },
    "host": {
      "id": "64def789abc123",
      "name": "Xoán López",
      "avatar": "https://...jpg"
    }
  }
]
```

**🟢 200 OK** — sin resultados
```json
[]
```

---

### `GET /properties/:id` 🔓
Devuelve el detalle completo de una propiedad, incluyendo el anfitrión.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID de la propiedad |

**🟢 200 OK**
```json
{
  "id": "64abc123def456",
  "title": "Casa en Baiona",
  "description": "Casa con vistas al mar, jardín privado y barbacoa.",
  "type": "entire",
  "price": 90,
  "capacity": 4,
  "photos": ["https://...jpg", "https://...jpg"],
  "rating": 4.5,
  "location": {
    "ria": "Ría de Vigo",
    "address": "Baiona, Pontevedra",
    "coords": { "lat": 42.119, "lng": -8.844 }
  },
  "host": {
    "id": "64def789abc123",
    "name": "Xoán López",
    "avatar": "https://...jpg",
    "bio": "Propietario en Rías Baixas."
  },
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 404 Not Found**
```json
{ "message": "Resource not found" }
```

---

### `POST /properties` 🔒 `host | dual`
Publica una nueva propiedad.

**Body**
```json
{
  "title": "Casa en Baiona",
  "description": "Casa con vistas al mar, jardín privado y barbacoa.",
  "type": "entire",
  "price": 90,
  "capacity": 4,
  "photos": ["https://...jpg", "https://...jpg"],
  "location": {
    "ria": "Ría de Vigo",
    "address": "Baiona, Pontevedra",
    "coords": { "lat": 42.119, "lng": -8.844 }
  }
}
```

| Campo | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| title | String | ✅ | |
| description | String | ✅ | |
| type | String | ✅ | `entire` \| `room` |
| price | Number | ✅ | €/noche |
| capacity | Number | ✅ | Nº máximo de huéspedes |
| photos | Array | ✅ | Mínimo 3 URLs |
| location | Object | ✅ | ria, address, coords (opcional) |

**🟢 201 Created** — devuelve la propiedad creada

**🔴 403 Forbidden** — rol incorrecto
```json
{ "message": "Forbidden" }
```

---

### `PATCH /properties/:id` 🔒 `host | dual`
Actualiza uno o varios campos de una propiedad. Solo el propietario puede editarla.

**Body** — todos los campos son opcionales
```json
{
  "price": 100,
  "description": "Nueva descripción actualizada."
}
```

**🟢 200 OK** — devuelve la propiedad actualizada

**🔴 403 Forbidden** — no es el propietario
```json
{ "message": "Forbidden" }
```

**🔴 404 Not Found**
```json
{ "message": "Property not found" }
```

---

### `DELETE /properties/:id` 🔒 `host`
Elimina una propiedad. Solo accesible para usuarios con rol `host`.

**🟢 204 No Content**

**🔴 403 Forbidden**
```json
{ "message": "Forbidden" }
```

**🔴 404 Not Found**
```json
{ "message": "Property not found" }
```

---

## 4. Reservas

### `GET /bookings/me` 🔒
Devuelve las reservas del usuario autenticado.

**Query params**

| Param | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| role | String | ❌ | `host` — si se omite, devuelve reservas como guest |

**Ejemplos**
```
GET /api/bookings/me           → reservas como guest
GET /api/bookings/me?role=host → reservas como host
```

**🟢 200 OK**
```json
[
  {
    "id": "64bbb111ccc222",
    "checkIn": "2026-07-01T00:00:00.000Z",
    "checkOut": "2026-07-05T00:00:00.000Z",
    "guests": 2,
    "status": "confirmed",
    "totalPrice": 360,
    "message": "Hola, ¿hay parking?",
    "property": {
      "id": "64abc123def456",
      "title": "Casa en Baiona",
      "photos": ["https://...jpg"],
      "location": { "ria": "Ría de Vigo", "address": "Baiona" }
    },
    "guest": {
      "id": "64abc999def000",
      "name": "Marta García",
      "avatar": "https://...jpg"
    }
  }
]
```

---

### `POST /bookings` 🔒 `guest | dual`
Solicita una reserva. Se crea con estado `pending`.

Validaciones:
- No se permite reservar si el mismo guest ya tiene una reserva `pending` o `confirmed` para esa propiedad en las mismas fechas.

**Body**
```json
{
  "property": "64abc123def456",
  "checkIn": "2026-07-01",
  "checkOut": "2026-07-05",
  "guests": 2,
  "message": "Hola, ¿hay parking?"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| property | ObjectId | ✅ | ID de la propiedad |
| checkIn | Date | ✅ | Fecha de entrada |
| checkOut | Date | ✅ | Fecha de salida |
| guests | Number | ✅ | Número de huéspedes |
| message | String | ❌ | Mensaje inicial para el anfitrión |

**🟢 201 Created**
```json
{
  "id": "64bbb111ccc222",
  "property": "64abc123def456",
  "guest": "64abc999def000",
  "checkIn": "2026-07-01T00:00:00.000Z",
  "checkOut": "2026-07-05T00:00:00.000Z",
  "guests": 2,
  "status": "pending",
  "totalPrice": 360,
  "message": "Hola, ¿hay parking?",
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 400 Bad Request** — reserva duplicada para el mismo guest
```json
{ "message": "Property not available for these dates" }
```

**🔴 403 Forbidden** — rol incorrecto
```json
{ "message": "Forbidden" }
```

---

### `PUT /bookings/:id/status` 🔒 `host | dual`
El anfitrión acepta o rechaza una reserva pendiente.

**Body**
```json
{
  "status": "confirmed"
}
```

| Campo | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| status | String | ✅ | `confirmed` \| `cancelled` |

**🟢 200 OK** — devuelve la reserva actualizada

**🔴 404 Not Found**
```json
{ "message": "Booking not found" }
```

---

### `DELETE /bookings/:id` 🔒
Cancela una reserva (cambia status a `cancelled`). Puede hacerlo el huésped o el anfitrión.

**🟢 200 OK** — devuelve la reserva con status `cancelled`

**🔴 404 Not Found**
```json
{ "message": "Booking not found" }
```

---

## 5. Mensajes

### `GET /bookings/:id/messages` 🔒
Devuelve los mensajes de una reserva en orden cronológico. Solo accesible para el guest o el host de esa reserva.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID de la reserva |

**🟢 200 OK**
```json
[
  {
    "id": "64eee555fff666",
    "booking": "64bbb111ccc222",
    "sender": {
      "id": "64abc999def000",
      "name": "Marta García",
      "avatar": "https://...jpg"
    },
    "receiver": "64def789abc123",
    "text": "Hola, ¿hay parking?",
    "createdAt": "2026-03-01T10:00:00.000Z"
  }
]
```

**🔴 403 Forbidden** — no es el guest ni el host de la reserva
```json
{ "message": "Forbidden" }
```

**🔴 404 Not Found**
```json
{ "message": "Booking not found" }
```

---

### `POST /bookings/:id/messages` 🔒
Envía un mensaje en una reserva. El receiver se calcula automáticamente (si eres el guest, el receiver es el host y viceversa).

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID de la reserva |

**Body**
```json
{
  "text": "Hola, ¿hay parking?"
}
```

| Campo | Tipo | Requerido |
|-------|------|-----------|
| text | String | ✅ |

**🟢 201 Created**
```json
{
  "id": "64eee555fff666",
  "booking": "64bbb111ccc222",
  "sender": "64abc999def000",
  "receiver": "64def789abc123",
  "text": "Hola, ¿hay parking?",
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 403 Forbidden** — no es el guest ni el host de la reserva
```json
{ "message": "Forbidden" }
```

**🔴 404 Not Found**
```json
{ "message": "Booking not found" }
```

---

## 6. Reseñas

### `GET /properties/:id/reviews` 🔓
Devuelve todas las reseñas de una propiedad, ordenadas de más reciente a más antigua.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID de la propiedad |

**🟢 200 OK**
```json
[
  {
    "id": "64ccc333ddd444",
    "rating": 5,
    "comment": "Casa preciosa, muy cerca de la playa. Repetiremos sin duda.",
    "createdAt": "2026-08-10T10:00:00.000Z",
    "author": {
      "id": "64abc999def000",
      "name": "Marta García",
      "avatar": "https://...jpg"
    }
  }
]
```

**🟢 200 OK** — sin reseñas
```json
[]
```

---

### `POST /properties/:id/reviews` 🔒 `guest | dual`
Escribe una reseña para una propiedad.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID de la propiedad |

**Body**
```json
{
  "rating": 5,
  "comment": "Casa preciosa, muy cerca de la playa. Repetiremos sin duda."
}
```

| Campo | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| rating | Number | ✅ | Entero entre 1 y 5 |
| comment | String | ✅ | Texto libre |

**🟢 201 Created** — devuelve la reseña creada

**🔴 403 Forbidden** — rol incorrecto
```json
{ "message": "Forbidden" }
```

---

## 7. Códigos de respuesta

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado correctamente |
| 204 | No Content | Eliminación exitosa |
| 400 | Bad Request | Datos incorrectos o regla de negocio violada |
| 401 | Unauthorized | Sin sesión activa |
| 403 | Forbidden | Sesión válida pero sin permisos suficientes |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Recurso duplicado (email ya registrado) |
| 500 | Server Error | Error inesperado en el servidor |

---

## 8. Autenticación de rutas privadas

La autenticación se gestiona mediante **sesiones con cookies HTTP**. No se usa JWT en headers.

El cliente debe enviar las peticiones con `withCredentials: true` para que la cookie de sesión se incluya automáticamente:

```javascript
const http = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});
```

Si no hay sesión activa, el servidor responde:

```json
{ "message": "Unauthorized" }
```

---

*Documentación actualizada para la versión 1.1 del MVP de Vagalume App.*  
*Actualizar con cada nuevo endpoint o cambio de contrato.*
