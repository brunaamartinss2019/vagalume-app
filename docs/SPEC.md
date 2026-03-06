# Vagalume App — Product Requirements Document (PRD)

> **Versión:** 1.1 — MVP (simplificado Bootcamp)  
> **Fecha:** Marzo 2026  
> **Stack:** MERN (MongoDB · Express · React · Node.js)  
> **Estado:** En desarrollo

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

> **Tagline propuesto:** *"Alójate en las Rías, como en casa."*

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
  UC-01  Buscar propiedades por fecha y ubicación
  UC-02  Ver disponibilidad de alojamiento completo o por habitación
  UC-03  Ver ficha de propiedad con fotos, descripción y valoraciones

ACTOR: Huésped (registrado)
  UC-04  Realizar reserva de alojamiento
  UC-05  Dejar comentario y valoración (1-5) tras estancia
  UC-06  Gestionar sus reservas activas/pasadas
  UC-07  Cerrar sesión

ACTOR: Anfitrión (registrado)
  UC-08  Publicar nueva propiedad (fotos, descripción, precio, tipo)
  UC-09  Ver reservas recibidas y aceptar / rechazar
  UC-10  Editar o eliminar su propiedad
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
├── /registro                → Crear cuenta (huésped o anfitrión)
├── /login                   → Iniciar sesión
│
└── /dashboard               → Panel de usuario (privado)
    ├── /mis-reservas        → Reservas como huésped
    ├── /mis-propiedades     → Propiedades publicadas (anfitrión)
    ├── /nueva-propiedad     → Formulario alta propiedad
    └── /perfil              → Datos personales + cerrar sesión
```

---

## 6. Funcionalidades del MVP

### 6.1 Autenticación y usuarios

| ID | Funcionalidad | Prioridad | Notas |
|----|--------------|-----------|-------|
| F-01 | Registro con email y contraseña | 🔴 Must | Requerido para publicar o reservar |
| F-02 | Login / Logout | 🔴 Must | JWT en backend |
| F-03 | Rol de usuario: huésped / anfitrión / dual | 🔴 Must | Seleccionable en registro |

### 6.2 Propiedades

| ID | Funcionalidad | Prioridad | Notas |
|----|--------------|-----------|-------|
| F-04 | Publicar propiedad (título, desc, fotos, precio, tipo) | 🔴 Must | Tipo: entera / habitación |
| F-05 | Editar y eliminar propiedad | 🔴 Must | Solo el propietario |
| F-06 | Búsqueda por fechas y ubicación (Rías) | 🔴 Must | Filtro básico |
| F-07 | Filtros: precio, tipo, capacidad | 🟡 Should | |
| F-08 | Galería de fotos (upload múltiple) | 🔴 Must | Min 1 foto obligatoria |
| F-09 | Mapa de ubicación | 🟢 Could | Leaflet.js o Google Maps — post-MVP |

### 6.3 Reservas

| ID | Funcionalidad | Prioridad | Notas |
|----|--------------|-----------|-------|
| F-10 | Solicitar reserva (fechas + nº huéspedes) | 🔴 Must | Solo usuarios registrados |
| F-11 | Confirmación / rechazo por anfitrión | 🔴 Must | El anfitrión decide manualmente |
| F-12 | Historial de reservas (huésped y anfitrión) | 🔴 Must | |
| F-13 | Cancelación de reserva | 🟡 Should | Política simple |
| F-14 | Pagos integrados | 🟠 TBD | A decidir — ver sección 9.1 |

### 6.4 Reseñas y valoraciones

| ID | Funcionalidad | Prioridad | Notas |
|----|--------------|-----------|-------|
| F-15 | Dejar comentario tras estancia | 🔴 Must | Solo si reserva completada |
| F-16 | Valoración numérica 1 a 5 estrellas | 🔴 Must | |
| F-17 | Media de valoraciones visible en ficha | 🔴 Must | |
| F-18 | Respuesta del anfitrión a reseña | 🟢 Could | Post-MVP |

---

## 7. Flujos de usuario

### 7.1 Flujo de reserva (Huésped)

```
[Home] 
  │
  ▼
[Buscar por fechas + ubicación]
  │
  ▼
[Ver resultados] ──filtros──▶ [Refinar búsqueda]
  │
  ▼
[Ficha de propiedad]
  │
  ├──▶ [Sin cuenta] ──▶ [Registro/Login] ──┐
  │                                         │
  └──▶ [Con cuenta] ──────────────────────▶│
                                            │
                                            ▼
                                    [Formulario de reserva]
                                    (fechas, nº huéspedes)
                                            │
                                            ▼
                                    [Confirmación enviada]
                                            │
                                            ▼
                              [Anfitrión acepta / rechaza]
                                            │
                                            ▼
                                    [Reserva confirmada]
                                  (email + dashboard)
```

### 7.2 Flujo de publicación (Anfitrión)

```
[Login / Registro como Anfitrión]
  │
  ▼
[Dashboard → "Nueva propiedad"]
  │
  ▼
[Paso 1: Tipo] → Entera / Habitación
  │
  ▼
[Paso 2: Detalles] → Título, descripción, capacidad, precio/noche
  │
  ▼
[Paso 3: Fotos] → Upload mínimo 1 imagen
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
│ role         Enum: guest | host | dual | admin│
│ avatar       String (URL)                    │
│ bio          String                          │
│ createdAt    Date                            │
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
│ photos       [String] (URLs)                 │
│ rating       Number (calculado)              │
│ createdAt    Date                            │
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
│ createdAt    Date                            │
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
│ createdAt    Date                            │
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
Axios / Fetch               JWT (jsonwebtoken)
Context API / Zustand       Bcrypt (passwords)
Tailwind CSS                Multer (file upload)
React Calendar              Dotenv
```

### 9.2 Autenticación

- JWT almacenado en `httpOnly cookie` o `localStorage`
- Middleware de autenticación en rutas protegidas
- Roles verificados en backend (no solo frontend)

### 9.3 API REST — Endpoints principales

```
AUTH
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/logout

USERS
  GET    /api/users/:id

PROPERTIES
  GET    /api/properties             → búsqueda con query params
  GET    /api/properties/:id
  POST   /api/properties             → [host]
  PUT    /api/properties/:id         → [host, owner]
  DELETE /api/properties/:id         → [host, owner]

BOOKINGS
  GET    /api/bookings/me            → mis reservas
  POST   /api/bookings               → [guest]
  PUT    /api/bookings/:id/status    → [host]
  DELETE /api/bookings/:id           → [guest, host]

REVIEWS
  GET    /api/reviews/property/:id
  POST   /api/reviews                → [guest, booking completed]
```

### 9.4 Pagos (pendiente de decisión)

> ⚠️ **Estado:** Por definir. Opciones evaluadas:

| Opción | Pros | Contras |
|--------|------|---------|
| Sin pago en MVP | Más rápido de lanzar | Sin monetización |
| Stripe | Estándar, bien documentado | Requiere cuenta empresa |
| Pago externo (Bizum/transferencia) | Sin integración técnica | Mala UX, sin trazabilidad |

**Recomendación:** Lanzar MVP sin pasarela de pago. Mostrar precio como referencia y gestionar pago offline. Integrar Stripe en v1.1.

---

## 10. Fuera de scope (MVP)

Las siguientes funcionalidades quedan **explícitamente excluidas** del MVP y se consideran para versiones futuras:

- [ ] Mensajería privada entre huésped y anfitrión
- [ ] Panel de administración
- [ ] Gestión de calendario de disponibilidad
- [ ] Perfil editable (nombre, foto, bio)
- [ ] Recuperación de contraseña por email
- [ ] Interfaz en gallego (i18n)
- [ ] Mapa interactivo de propiedades
- [ ] Sistema de pagos integrado (Stripe)
- [ ] Notificaciones push / email automáticos
- [ ] Verificación de identidad (KYC)
- [ ] App móvil nativa (iOS/Android)
- [ ] Reseñas del anfitrión sobre el huésped
- [ ] Integración con calendarios externos (iCal, Google)
- [ ] Dashboard de analíticas para anfitriones
- [ ] Sistema de disputas / soporte

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
 FASE 0 — Setup          [Días 1-2]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Estructura del proyecto MERN
  ✓ Configuración MongoDB Atlas
  ✓ Autenticación JWT (registro, login, logout)
  ✓ Despliegue inicial (Render + Vercel)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FASE 1 — Core           [Días 3-8]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  → CRUD de propiedades (publicar, editar, borrar)
  → Buscador con filtros básicos
  → Ficha de propiedad con fotos
  → Sistema de reservas (solicitar, aceptar, rechazar)
  → Dashboard: mis reservas + mis propiedades

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FASE 2 — Reviews + Presentación  [Días 9-14]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  → Reseñas y valoraciones (1-5 estrellas)
  → Media de valoraciones en ficha
  → Pulido de UI y responsividad
  → Testing manual de flujos principales
  → Lanzamiento MVP 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 v1.1 — Post-MVP         [Futuro]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  → Integración Stripe
  → Mensajería privada
  → Mapa interactivo (Leaflet)
  → i18n (Gallego / Inglés)
  → Notificaciones por email
  → Panel de administración
```

---

*Documento generado como especificación de producto para el MVP de Vagalume App.*  
*Revisar y actualizar en cada sprint. Versión viva.*
