# Vagalume App — API Documentation

> **Base URL:** `http://localhost:3000/api`  
> **Versión:** 1.0 — MVP  
> **Formato:** JSON  
> **Autenticación:** Bearer Token (JWT)

---

## Tabla de contenidos

1. [Autenticación](#1-autenticación)
2. [Propiedades](#2-propiedades)
3. [Reservas](#3-reservas)
4. [Reseñas](#4-reseñas)
5. [Usuarios](#5-usuarios)
6. [Códigos de respuesta](#6-códigos-de-respuesta)
7. [Autenticación de rutas privadas](#7-autenticación-de-rutas-privadas)

---

## Convenciones

| Símbolo | Significado |
|---------|-------------|
| 🔓 | Ruta pública — no requiere token |
| 🔒 | Ruta privada — requiere `Authorization: Bearer <token>` |
| 🟢 | Respuesta exitosa |
| 🔴 | Respuesta de error |

---

## 1. Autenticación

### `POST /auth/register` 🔓
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc123def456",
    "name": "Marta García",
    "email": "marta@gmail.com",
    "role": "guest"
  }
}
```

**🔴 400 Bad Request** — email ya registrado
```json
{ "message": "El email ya está registrado" }
```

---

### `POST /auth/login` 🔓
Inicia sesión con email y contraseña.

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc123def456",
    "name": "Marta García",
    "email": "marta@gmail.com",
    "role": "guest"
  }
}
```

**🔴 401 Unauthorized** — credenciales incorrectas
```json
{ "message": "Credenciales incorrectas" }
```

---

### `POST /auth/logout` 🔒
Cierra la sesión del usuario. El cliente debe eliminar el token almacenado.

**Body** — vacío

**🟢 200 OK**
```json
{ "message": "Sesión cerrada correctamente" }
```

---

## 2. Propiedades

### `GET /properties` 🔓
Busca propiedades disponibles. Acepta filtros como query params.

**Query params** — todos opcionales

| Param | Tipo | Ejemplo | Descripción |
|-------|------|---------|-------------|
| checkIn | Date | `2026-07-01` | Fecha de entrada |
| checkOut | Date | `2026-07-05` | Fecha de salida |
| capacity | Number | `2` | Número mínimo de huéspedes |
| type | String | `entire` | `entire` \| `room` |
| maxPrice | Number | `100` | Precio máximo por noche |

**Ejemplo de llamada**
```
GET /api/properties?checkIn=2026-07-01&checkOut=2026-07-05&capacity=2&type=entire
```

**🟢 200 OK**
```json
[
  {
    "_id": "64abc123def456",
    "title": "Casa en Baiona",
    "type": "entire",
    "price": 90,
    "capacity": 4,
    "photos": ["https://...jpg", "https://...jpg"],
    "rating": 4.5,
    "location": {
      "ria": "Rías Baixas",
      "address": "Baiona, Pontevedra"
    },
    "host": {
      "_id": "64def789abc123",
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
  "_id": "64abc123def456",
  "title": "Casa en Baiona",
  "description": "Casa con vistas al mar, jardín privado y barbacoa.",
  "type": "entire",
  "price": 90,
  "capacity": 4,
  "photos": ["https://...jpg", "https://...jpg"],
  "rating": 4.5,
  "location": {
    "ria": "Rías Baixas",
    "address": "Baiona, Pontevedra",
    "coords": { "lat": 42.119, "lng": -8.844 }
  },
  "host": {
    "_id": "64def789abc123",
    "name": "Xoán López",
    "avatar": "https://...jpg"
  },
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 404 Not Found**
```json
{ "message": "Propiedad no encontrada" }
```

---

### `POST /properties` 🔒 `host | dual`
Publica una nueva propiedad. Solo accesible para usuarios con rol `host` o `dual`.

**Headers**
```
Authorization: Bearer <token>
```

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
    "ria": "Rías Baixas",
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
| photos | Array | ✅ | Mínimo 3 URL |
| location | Object | ✅ | ria, address, coords (opcional) |

**🟢 201 Created**
```json
{
  "_id": "64abc123def456",
  "title": "Casa en Baiona",
  "type": "entire",
  "price": 90,
  "capacity": 4,
  "photos": ["https://...jpg"],
  "rating": 0,
  "location": { "ria": "Rías Baixas", "address": "Baiona, Pontevedra" },
  "host": "64def789abc123",
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 403 Forbidden** — rol incorrecto
```json
{ "message": "Solo los anfitriones pueden publicar propiedades" }
```

---

### `PATCH /properties/:id` 🔒 `host | dual`
Actualiza uno o varios campos de una propiedad. Solo el propietario puede editarla.

**Headers**
```
Authorization: Bearer <token>
```

**Body** — todos los campos son opcionales, envía solo los que quieras actualizar
```json
{
  "price": 100,
  "description": "Nueva descripción actualizada."
}
```

**🟢 200 OK** — devuelve la propiedad actualizada
```json
{
  "_id": "64abc123def456",
  "title": "Casa en Baiona",
  "price": 100,
  "description": "Nueva descripción actualizada.",
  "..."
}
```

**🔴 403 Forbidden** — no es el propietario
```json
{ "message": "No tienes permiso para editar esta propiedad" }
```

**🔴 404 Not Found**
```json
{ "message": "Propiedad no encontrada" }
```

---

### `DELETE /properties/:id` 🔒 `host | dual`
Elimina una propiedad. Solo el propietario puede borrarla y no puede tener reservas activas.

**Headers**
```
Authorization: Bearer <token>
```

**🟢 200 OK**
```json
{ "message": "Propiedad eliminada correctamente" }
```

**🔴 400 Bad Request** — tiene reservas activas
```json
{ "message": "No puedes eliminar una propiedad con reservas activas" }
```

**🔴 403 Forbidden**
```json
{ "message": "No tienes permiso para eliminar esta propiedad" }
```

---

## 3. Reservas

### `GET /bookings/me` 🔒
Devuelve las reservas del usuario autenticado. Según el query param `role`, devuelve las reservas como huésped o como anfitrión.

**Headers**
```
Authorization: Bearer <token>
```

**Query params**

| Param | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| role | String | ✅ | `guest` \| `host` |

**Ejemplo**
```
GET /api/bookings/me?role=guest
```

**🟢 200 OK**
```json
[
  {
    "_id": "64bbb111ccc222",
    "checkIn": "2026-07-01T00:00:00.000Z",
    "checkOut": "2026-07-05T00:00:00.000Z",
    "guests": 2,
    "status": "confirmed",
    "totalPrice": 360,
    "property": {
      "_id": "64abc123def456",
      "title": "Casa en Baiona",
      "photos": ["https://...jpg"],
      "location": { "ria": "Rías Baixas", "address": "Baiona" }
    },
    "guest": {
      "_id": "64abc999def000",
      "name": "Marta García",
      "avatar": "https://...jpg"
    }
  }
]
```

---

### `POST /bookings` 🔒 `guest | dual`
Solicita una reserva para una propiedad. La reserva se crea con estado `pending`.

**Headers**
```
Authorization: Bearer <token>
```

**Body**
```json
{
  "property": "64abc123def456",
  "checkIn": "2026-07-01",
  "checkOut": "2026-07-05",
  "guests": 2
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| property | ObjectId | ✅ | ID de la propiedad |
| checkIn | Date | ✅ | Fecha de entrada |
| checkOut | Date | ✅ | Fecha de salida |
| guests | Number | ✅ | Número de huéspedes |

**🟢 201 Created**
```json
{
  "_id": "64bbb111ccc222",
  "property": "64abc123def456",
  "guest": "64abc999def000",
  "checkIn": "2026-07-01T00:00:00.000Z",
  "checkOut": "2026-07-05T00:00:00.000Z",
  "guests": 2,
  "status": "pending",
  "totalPrice": 360,
  "createdAt": "2026-03-01T10:00:00.000Z"
}
```

**🔴 400 Bad Request** — fechas no disponibles
```json
{ "message": "La propiedad no está disponible en esas fechas" }
```

**🔴 400 Bad Request** — el host intenta reservar su propia propiedad
```json
{ "message": "No puedes reservar tu propia propiedad" }
```

**🔴 403 Forbidden** — rol incorrecto
```json
{ "message": "Solo los huéspedes pueden realizar reservas" }
```

---

### `PUT /bookings/:id/status` 🔒 `host | dual`
El anfitrión acepta o rechaza una reserva pendiente.

**Headers**
```
Authorization: Bearer <token>
```

**Body**
```json
{
  "status": "confirmed"
}
```

| Campo | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| status | String | ✅ | `confirmed` \| `cancelled` |

**🟢 200 OK**
```json
{
  "_id": "64bbb111ccc222",
  "status": "confirmed",
  "property": "64abc123def456",
  "guest": "64abc999def000",
  "checkIn": "2026-07-01T00:00:00.000Z",
  "checkOut": "2026-07-05T00:00:00.000Z",
  "totalPrice": 360
}
```

**🔴 400 Bad Request** — la reserva ya fue procesada
```json
{ "message": "Esta reserva ya fue confirmada o cancelada" }
```

**🔴 403 Forbidden** — no es el anfitrión de esa propiedad
```json
{ "message": "No tienes permiso para gestionar esta reserva" }
```

---

### `DELETE /bookings/:id` 🔒
Cancela una reserva. Puede hacerlo el huésped o el anfitrión.

**Headers**
```
Authorization: Bearer <token>
```

**🟢 200 OK**
```json
{ "message": "Reserva cancelada correctamente" }
```

**🔴 400 Bad Request** — ya está cancelada
```json
{ "message": "Esta reserva ya está cancelada" }
```

**🔴 403 Forbidden**
```json
{ "message": "No tienes permiso para cancelar esta reserva" }
```

---

## 4. Reseñas

### `GET /reviews/property/:id` 🔓
Devuelve todas las reseñas de una propiedad, ordenadas de más reciente a más antigua.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID de la propiedad |

**🟢 200 OK**
```json
[
  {
    "_id": "64ccc333ddd444",
    "rating": 5,
    "comment": "Casa preciosa, muy cerca de la playa. Repetiremos sin duda.",
    "createdAt": "2026-08-10T10:00:00.000Z",
    "author": {
      "_id": "64abc999def000",
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

### `POST /reviews` 🔒 `guest | dual`
Escribe una reseña para una propiedad. Solo es posible si existe una reserva confirmada o completada del usuario para esa propiedad, y si no ha escrito ya una reseña para esa misma reserva.

**Headers**
```
Authorization: Bearer <token>
```

**Body**
```json
{
  "property": "64abc123def456",
  "booking": "64bbb111ccc222",
  "rating": 5,
  "comment": "Casa preciosa, muy cerca de la playa. Repetiremos sin duda."
}
```

| Campo | Tipo | Requerido | Valores |
|-------|------|-----------|---------|
| property | ObjectId | ✅ | ID de la propiedad |
| booking | ObjectId | ✅ | ID de la reserva |
| rating | Number | ✅ | Entero entre 1 y 5 |
| comment | String | ✅ | Texto libre |

**🟢 201 Created**
```json
{
  "_id": "64ccc333ddd444",
  "property": "64abc123def456",
  "booking": "64bbb111ccc222",
  "rating": 5,
  "comment": "Casa preciosa, muy cerca de la playa. Repetiremos sin duda.",
  "createdAt": "2026-08-10T10:00:00.000Z",
  "author": {
    "_id": "64abc999def000",
    "name": "Marta García"
  }
}
```

**🔴 400 Bad Request** — ya existe una reseña para esta reserva
```json
{ "message": "Ya has escrito una reseña para esta estancia" }
```

**🔴 400 Bad Request** — la reserva no está confirmada
```json
{ "message": "Solo puedes reseñar reservas confirmadas" }
```

**🔴 403 Forbidden** — la reserva no pertenece al usuario
```json
{ "message": "No puedes reseñar una reserva que no es tuya" }
```

---

## 5. Usuarios

### `GET /users/:id` 🔓
Devuelve el perfil público de un usuario. No expone email ni contraseña.

**Params**

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId | ID del usuario |

**🟢 200 OK**
```json
{
  "_id": "64def789abc123",
  "name": "Xoán López",
  "avatar": "https://...jpg",
  "role": "host",
  "createdAt": "2026-01-15T10:00:00.000Z"
}
```

**🔴 404 Not Found**
```json
{ "message": "Usuario no encontrado" }
```

---

## 6. Códigos de respuesta

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado correctamente |
| 400 | Bad Request | Datos incorrectos o regla de negocio violada |
| 401 | Unauthorized | Token ausente, inválido o expirado |
| 403 | Forbidden | Token válido pero sin permisos suficientes |
| 404 | Not Found | Recurso no encontrado |
| 500 | Server Error | Error inesperado en el servidor |

---

## 7. Autenticación de rutas privadas

Todas las rutas marcadas con 🔒 requieren enviar el token JWT en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

El token se obtiene al hacer login o registro y tiene una validez de **7 días**.

Si el token es inválido o ha expirado, el servidor responde:

```json
{ "message": "Token inválido o expirado" }
```

---

*Documentación generada para el MVP de Vagalume App.*  
*Actualizar con cada nuevo endpoint o cambio de contrato.*


