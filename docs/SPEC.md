# Vagalume App — Product Requirements Document (PRD)

> **Versión:** 1.2 — MVP actualizado  
> **Fecha:** Marzo 2026  
> **Stack:** MERN (MongoDB · Express · React · Node.js)  
> **Estado:** MVP completado

---

## Tabla de contenidos

1. [Visión del producto](#1-visión-del-producto)
2. [Problema y oportunidad](#2-problema-y-oportunidad)
3. [Usuarios objetivo](#3-usuarios-objetivo)
4. [Casos de uso principales](#4-casos-de-uso-principales)
5. [Arquitectura de información](#5-arquitectura-de-información)
6. [Funcionalidades del MVP](#6-funcionalidades-del-mvp)
7. [Flujos de usuario](#7-flujos-de-usuario)
8. [Modelo de datos](#8-modelo-de-datos)
9. [Requisitos técnicos](#9-requisitos-técnicos)
10. [Fuera de scope (MVP)](#10-fuera-de-scope-mvp)
11. [Métricas de éxito](#11-métricas-de-éxito)
12. [Roadmap](#12-roadmap)

---

## 1. Visión del producto

**Vagalume** es una plataforma web de gestión de alquiler vacacional especializada en las **Rías Galegas** (Galicia, España). Inspirada en el modelo de Airbnb pero con foco local y precios más accesibles, conecta a propietarios de alojamientos de la zona con viajeros que buscan experiencias auténticas en el entorno atlántico gallego.

> **Tagline:** *"Alójate en las Rías, como en casa."*

### Propuesta de valor diferencial

| Factor | Airbnb | Vagalume |
|---|---|---|
| Cobertura geográfica | Global | Solo Rías Galegas |
| Posicionamiento de precio | Premium | Económico / local |
| Idioma principal | Inglés / Español | Español (+ Gallego futuro) |
| Comunidad | Anónima y masiva | Local y cercana |
| Comisión estimada | ~14-16% | A definir (menor) |

---

## 2. Problema y oportunidad

### El problema

Los viajeros que quieren alojarse en las Rías Galegas deben competir en plataformas globales (Airbnb, Booking) donde:
- Los precios se disparan en temporada alta.
- La oferta local queda sepultada por propiedades de grandes operadores.
- No existe una comunidad específica con conocimiento del territorio.

Los propietarios locales, por su parte, pagan comisiones elevadas y no tienen visibilidad en una audiencia que realmente quiere visitar Galicia.

### La oportunidad

```
Turismo en Galicia (2024): +12M visitantes/año
Rías Galegas: destino de sol, mar y gastronomía en auge
Mercado de alquiler vacacional rural/costero: infraservido digitalmente
```

---

## 3. Usuarios objetivo

### 3.1 Tipos de usuario

```
┌──────────────────────────────────────────────────────┐
│                  USUARIOS VAGALUME                    │
├──────────────┬──────────────┬────────────────────────┤
│   Huésped    │  Anfitrión   │    Usuario Dual         │
│  (Guest)     │  (Host)      │    (Host + Guest)       │
├──────────────┼──────────────┼────────────────────────┤
│ Busca y      │ Publica y    │ Puede hacer ambas cosas │
│ reserva      │ gestiona     │                         │
│ alojamiento  │ propiedades  │                         │
└──────────────┴──────────────┴────────────────────────┘
```

### 3.2 Personas

#### 🧳 Marta — La Huésped
- **Edad:** 34 años, de Madrid
- **Perfil:** Trabajadora remota, busca escapadas de fin de semana en la costa
- **Motivación:** Encontrar alojamiento auténtico y asequible en las Rías
- **Frustración:** En Airbnb todo es caro y las reseñas son poco fiables

#### 🏠 Xoán — El Anfitrión
- **Edad:** 55 años, propietario en Rías Baixas
- **Perfil:** Tiene una casa rural y quiere rentabilizarla en verano
- **Motivación:** Publicar fácilmente sin pagar comisiones abusivas
- **Frustración:** Las plataformas grandes son complicadas y le cobran mucho

#### 👤 Laura — La Usuaria Dual
- **Edad:** 28 años, de Vigo
- **Perfil:** Tiene una habitación libre que alquila y también viaja
- **Motivación:** Usar la misma plataforma para ambas cosas

---

## 4. Casos de uso principales

```
ACTOR: Huésped (sin registrar)
  UC-01  Buscar propiedades por ría, capacidad, precio y tipo
  UC-02  Ver disponibilidad de alojamiento completo o por habitación
  UC-03  Ver ficha de propiedad con fotos, descripción y valoraciones

ACTOR: Huésped (registrado)
  UC-04  Realizar reserva de alojamiento con mensaje opcional al anfitrión
  UC-05  Dejar comentario y valoración (1-5) tras estancia
  UC-06  Gestionar sus reservas activas/pasadas con filtro por estado
  UC-07  Chatear con el anfitrión desde el dashboard de reservas
  UC-08  Cerrar sesión

ACTOR: Anfitrión (registrado)
  UC-09  Publicar nueva propiedad (fotos, descripción, precio, tipo)
  UC-10  Ver reservas recibidas y aceptar / rechazar
  UC-11  Editar o eliminar su propiedad
  UC-12  Chatear con el huésped desde el dashboard de reservas
```

---

## 5. Arquitectura de información

```
vagalume.app/
│
├── /                        → Home: buscador + destacados
├── /buscar                  → Resultados de búsqueda con filtros
├── /propiedad/:id           → Ficha de propiedad
│   ├── Fotos
│   ├── Descripción
│   ├── Valoraciones y comentarios
│   └── Botón reservar
│
├── /reservar/:id            → Formulario de reserva con mensaje opcional
├── /registro                → Crear cuenta (huésped o anfitrión)
├── /login                   → Iniciar sesión
│
└── /dashboard               → Panel de usuario (privado)
    ├── /mis-reservas        → Reservas como huésped + chat por reserva
    ├── /mis-propiedades     → Propiedades publicadas (anfitrión)
    └── /nueva-propiedad     → Formulario alta propiedad
```

---

## 6. Funcionalidades del MVP

### 6.1 Autenticación y usuarios

| ID | Funcionalidad | Estado | Notas |
|----|--------------|--------|-------|
| F-01 | Registro con email y contraseña | ✅ Completado | |
| F-02 | Login / Logout | ✅ Completado | Sesiones con cookies |
| F-03 | Rol de usuario: huésped / anfitrión / dual | ✅ Completado | Seleccionable en registro |

### 6.2 Propiedades

| ID | Funcionalidad | Estado | Notas |
|----|--------------|--------|-------|
| F-04 | Publicar propiedad (título, desc, fotos, precio, tipo) | ✅ Completado | |
| F-05 | Editar y eliminar propiedad | ✅ Completado | Solo el propietario |
| F-06 | Búsqueda por ría y filtros | ✅ Completado | Filtros: ría, capacidad, tipo, precio |
| F-07 | Filtros: precio, tipo, capacidad | ✅ Completado | |
| F-08 | Galería de fotos | ✅ Completado | Min 3 fotos obligatorias |
| F-09 | Mapa de ubicación | 🟢 Post-MVP | Leaflet.js o Google Maps |

### 6.3 Reservas

| ID | Funcionalidad | Estado | Notas |
|----|--------------|--------|-------|
| F-10 | Solicitar reserva (fechas + nº huéspedes + mensaje) | ✅ Completado | |
| F-11 | Confirmación / rechazo por anfitrión | ✅ Completado | |
| F-12 | Historial de reservas con filtro por estado | ✅ Completado | |
| F-13 | Cancelación de reserva | ✅ Completado | |
| F-14 | Validación de fechas (no duplicados por mismo guest) | ✅ Completado | |
| F-15 | Pagos integrados | 🟢 Post-MVP | Ver sección 9.1 |

### 6.4 Mensajería

| ID | Funcionalidad | Estado | Notas |
|----|--------------|--------|-------|
| F-16 | Mensaje inicial al reservar | ✅ Completado | Campo opcional en formulario de reserva |
| F-17 | Chat entre guest y host por reserva | ✅ Completado | Disponible en dashboard de reservas |

### 6.5 Reseñas y valoraciones

| ID | Funcionalidad | Estado | Notas |
|----|--------------|--------|-------|
| F-18 | Dejar comentario tras estancia | ✅ Completado | |
| F-19 | Valoración numérica 1 a 5 estrellas | ✅ Completado | |
| F-20 | Media de valoraciones visible en ficha | ✅ Completado | |
| F-21 | Respuesta del anfitrión a reseña | 🟢 Post-MVP | |

---

## 7. Flujos de usuario

### 7.1 Flujo de búsqueda (sin cuenta)

```
[Home]
  │
  ▼
[Barra de búsqueda] → Destino (Ría) + Entrada + Salida + Viajeros
  │
  ▼
[/buscar?ria=vigo&checkIn=...&checkOut=...&capacity=2]
  │
  ▼
[Resultados filtrados]
  │
  ▼
[Ficha de propiedad] → Fotos + Descripción + Reseñas + Precio
```

### 7.2 Flujo de reserva (Huésped)

```
[Ficha de propiedad]
  │
  ├──▶ [Sin cuenta] ──▶ [Login] ──┐
  │                               │
  └──▶ [Con cuenta] ─────────────▶│
                                  ▼
                          [/reservar/:id]
                          ├── Fechas entrada/salida
                          ├── Nº huéspedes
                          ├── Mensaje para el anfitrión (opcional)
                          └── Total calculado en tiempo real
                                  │
                                  ▼
                          [Booking creado — status: pending]
                                  │
                                  ▼
                          [Dashboard → Mis reservas]
                          └── Chat disponible con el anfitrión
                                  │
                                  ▼
                          [Anfitrión confirma / rechaza]
```

### 7.3 Flujo de publicación (Anfitrión)

```
[Login / Registro como Anfitrión]
  │
  ▼
[Dashboard → "Nueva propiedad"]
  │
  ▼
[Formulario: tipo, título, descripción, capacidad, precio, fotos, ubicación]
  │
  ▼
[Publicar] → Visible en buscador ✅
```

---

## 8. Modelo de datos

### 8.1 Colecciones MongoDB

```
┌─────────────────────────────────────────────┐
│ USERS                                        │
├─────────────────────────────────────────────┤
│ _id          ObjectId                        │
│ name         String                          │
│ email        String (unique)                 │
│ password     String (hashed)                 │
│ role         Enum: guest | host | dual       │
│ avatar       String (URL)                    │
│ bio          String                          │
│ createdAt    Date (auto)                     │
│ updatedAt    Date (auto)                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ PROPERTIES                                   │
├─────────────────────────────────────────────┤
│ _id          ObjectId                        │
│ host         Ref → Users                     │
│ title        String                          │
│ description  String                          │
│ type         Enum: entire | room             │
│ location     { ria, address, coords }        │
│ price        Number (€/noche)                │
│ capacity     Number (max huéspedes)          │
│ photos       [String] (URLs, min 3)          │
│ rating       Number (calculado por reviews)  │
│ createdAt    Date (auto)                     │
│ updatedAt    Date (auto)                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ BOOKINGS                                     │
├─────────────────────────────────────────────┤
│ _id          ObjectId                        │
│ guest        Ref → Users                     │
│ property     Ref → Properties                │
│ checkIn      Date                            │
│ checkOut     Date                            │
│ guests       Number                          │
│ status       Enum: pending|confirmed|cancelled│
│ totalPrice   Number                          │
│ message      String (opcional)               │
│ createdAt    Date (auto)                     │
│ updatedAt    Date (auto)                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ MESSAGES                                     │
├─────────────────────────────────────────────┤
│ _id          ObjectId                        │
│ booking      Ref → Bookings                  │
│ sender       Ref → Users                     │
│ receiver     Ref → Users                     │
│ text         String                          │
│ createdAt    Date (auto)                     │
│ updatedAt    Date (auto)                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ REVIEWS                                      │
├─────────────────────────────────────────────┤
│ _id          ObjectId                        │
│ author       Ref → Users                     │
│ property     Ref → Properties                │
│ booking      Ref → Bookings                  │
│ rating       Number (1-5)                    │
│ comment      String                          │
│ createdAt    Date (auto)                     │
│ updatedAt    Date (auto)                     │
└─────────────────────────────────────────────┘
```

---

## 9. Requisitos técnicos

### 9.1 Stack tecnológico

```
FRONTEND                    BACKEND
──────────────────────      ──────────────────────
React (Vite)                Node.js + Express
React Router v6             Mongoose (MongoDB)
Axios                       express-session
Context API                 Bcrypt (passwords)
React Hook Form             http-errors
Bootstrap 5                 Dotenv
```

### 9.2 Autenticación

- Sesiones gestionadas con `express-session` y cookies HTTP
- `withCredentials: true` en todas las peticiones del cliente
- Middleware de autenticación en rutas protegidas
- Roles verificados en backend mediante middleware `checkRole`

### 9.3 API REST — Endpoints

```
AUTH
  POST   /api/users               → registro
  POST   /api/sessions            → login
  DELETE /api/sessions            → logout

USERS
  GET    /api/users/me            → perfil propio [privado]
  GET    /api/users/:id           → perfil público

PROPERTIES
  GET    /api/properties          → búsqueda con query params
  GET    /api/properties/:id      → detalle
  POST   /api/properties          → [host | dual]
  PATCH  /api/properties/:id      → [host | dual, owner]
  DELETE /api/properties/:id      → [host, owner]

BOOKINGS
  GET    /api/bookings/me         → mis reservas [?role=host]
  POST   /api/bookings            → [guest | dual]
  PUT    /api/bookings/:id/status → [host | dual]
  DELETE /api/bookings/:id        → [guest | host | dual]

MESSAGES
  GET    /api/bookings/:id/messages  → [guest | host de la reserva]
  POST   /api/bookings/:id/messages  → [guest | host de la reserva]

REVIEWS
  GET    /api/properties/:id/reviews → público
  POST   /api/properties/:id/reviews → [guest | dual]
```

### 9.4 Pagos (pendiente de decisión)

> ⚠️ **Estado:** Por definir. MVP lanzado sin pasarela de pago.

| Opción | Pros | Contras |
|--------|------|---------|
| Sin pago en MVP | Más rápido de lanzar | Sin monetización |
| Stripe | Estándar, bien documentado | Requiere cuenta empresa |
| Pago externo (Bizum/transferencia) | Sin integración técnica | Mala UX, sin trazabilidad |

**Recomendación:** Integrar Stripe en v1.1.

---

## 10. Fuera de scope (MVP)

- [ ] Panel de administración
- [ ] Gestión de calendario de disponibilidad visual
- [ ] Perfil editable (nombre, foto, bio)
- [ ] Recuperación de contraseña por email
- [ ] Interfaz en gallego (i18n)
- [ ] Mapa interactivo de propiedades (Leaflet)
- [ ] Sistema de pagos integrado (Stripe)
- [ ] Notificaciones push / email automáticos
- [ ] Verificación de identidad (KYC)
- [ ] App móvil nativa (iOS/Android)
- [ ] Reseñas del anfitrión sobre el huésped
- [ ] Integración con calendarios externos (iCal, Google)
- [ ] Dashboard de analíticas para anfitriones
- [ ] Sistema de disputas / soporte
- [ ] Chat en tiempo real (WebSockets)

---

## 11. Métricas de éxito

### KPIs del MVP (primeros 3 meses)

| Métrica | Objetivo |
|---------|----------|
| Propiedades publicadas | ≥ 30 |
| Usuarios registrados | ≥ 200 |
| Reservas completadas | ≥ 50 |
| Tasa de conversión (visita → reserva) | ≥ 3% |
| NPS (Net Promoter Score) | ≥ 30 |
| Valoración media de propiedades | ≥ 4.0 / 5 |

---

## 12. Roadmap

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FASE 0 — Setup          ✅ Completado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Estructura del proyecto MERN
  ✓ Configuración MongoDB Atlas
  ✓ Autenticación con sesiones (registro, login, logout)
  ✓ Roles: guest, host, dual

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FASE 1 — Core           ✅ Completado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ CRUD de propiedades (publicar, editar, borrar)
  ✓ Buscador con filtros (ría, capacidad, tipo, precio)
  ✓ SearchPage con resultados
  ✓ Ficha de propiedad con fotos
  ✓ Sistema de reservas (solicitar, aceptar, rechazar)
  ✓ Validación de reservas duplicadas por guest
  ✓ Dashboard: mis reservas + mis propiedades
  ✓ Filtro por estado en mis reservas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FASE 2 — Reviews + Mensajería  ✅ Completado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Reseñas y valoraciones (1-5 estrellas)
  ✓ Media de valoraciones en ficha
  ✓ Mensaje inicial al reservar
  ✓ Chat guest ↔ host por reserva
  ✓ Pulido de UI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 v1.1 — Post-MVP         [Futuro]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  → Integración Stripe
  → Mapa interactivo (Leaflet)
  → Perfil editable
  → i18n (Gallego / Inglés)
  → Notificaciones por email
  → Panel de administración
  → Chat en tiempo real (WebSockets)
```

---

*Documento actualizado para la versión 1.2 del MVP de Vagalume App.*  
*Revisar y actualizar en cada sprint. Versión viva.*
