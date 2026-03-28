# 🌊 Vagalume App

> *"Alójate en las Rías, como en casa." / "Stay in the Rías, just like home."*

**[🇪🇸 Español](#español) · [🇬🇧 English](#english)**

---

## 🇪🇸 Español

**Vagalume** es una plataforma web de alquiler vacacional especializada en las **Rías Galegas** (Galicia, España). Conecta a propietarios locales con viajeros que buscan experiencias auténticas en el entorno atlántico gallego.

Inspirada en el modelo de Airbnb pero con foco local, precios más accesibles y una comunidad cercana.

---

### ✨ Funcionalidades principales

- 🔍 **Buscador** por Ría, fechas, nº viajeros y precio máximo
- 🏠 **Ficha de propiedad** con galería de fotos, descripción, anfitrión y reseñas
- 📅 **Reservas** con validación de fechas, cálculo de precio en tiempo real y mensaje inicial al anfitrión
- 💬 **Chat** entre huésped y anfitrión por reserva
- ⭐ **Reseñas** y valoraciones (1-5 estrellas)
- 👤 **Dashboard** para gestionar reservas y propiedades
- 🔐 **Autenticación** con sesiones — roles: `guest`, `host`, `dual`

---

### 🛠️ Tecnologías

#### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

#### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

---

### 📸 Capturas

| Home | Búsqueda | Reserva |
|------|----------|---------|
| ![home](#) | ![search](#) | ![booking](#) |

---

### 🚀 Instalación

#### Requisitos
- Node.js v18+
- MongoDB (local o Atlas)

#### Backend
```bash
cd api
npm install
cp .env.example .env   # configura tus variables de entorno
npm run dev
```

#### Frontend
```bash
cd web
npm install
npm run dev
```

#### Variables de entorno (`.env`)
```
MONGODB_URI=mongodb://localhost:27017/vagalume
SESSION_SECRET=tu_secreto_aqui
PORT=3000
```

---

### 📁 Estructura del proyecto

```
vagalume-app/
├── api/                        # Backend — Node.js + Express
│   ├── config/                 # Rutas y configuración
│   ├── controllers/            # Lógica de negocio
│   ├── middlewares/            # Auth, roles, errores
│   ├── models/                 # Esquemas Mongoose
│   └── app.js
│
├── web/                        # Frontend — React + Vite
│   └── src/
│       ├── components/         # Navbar, Chat...
│       ├── context/            # AuthContext
│       ├── pages/              # Home, Search, Property, Dashboard...
│       └── services/           # api-service.js
│
└── docs/                       # SPEC.md + API_DOCS.md
```

---

### 📄 Documentación

- [📘 API Documentation](./docs/API_DOCS.md)
- [📋 Product Spec (PRD)](./docs/SPEC.md)

---

### 👩‍💻 Autora

**Bruna Martins**  
Proyecto de fin de bootcamp — Ironhack 2026  

---

---

## 🇬🇧 English

**Vagalume** is a vacation rental web platform specialized in the **Galician Rías** (Galicia, Spain). It connects local property owners with travelers looking for authentic experiences along the Atlantic coast.

Inspired by Airbnb but with a local focus, more accessible prices and a close-knit community.

---

### ✨ Main Features

- 🔍 **Search** by Ría, dates, number of guests and maximum price
- 🏠 **Property detail** with photo gallery, description, host info and reviews
- 📅 **Bookings** with date validation, real-time price calculation and initial message to the host
- 💬 **Chat** between guest and host per booking
- ⭐ **Reviews** and ratings (1-5 stars)
- 👤 **Dashboard** to manage bookings and properties
- 🔐 **Authentication** with sessions — roles: `guest`, `host`, `dual`

---

### 🛠️ Tech Stack

#### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

#### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

---

### 📸 Screenshots

| Home | Search | Booking |
|------|--------|---------|
| ![home](#) | ![search](#) | ![booking](#) |

---

### 🚀 Getting Started

#### Requirements
- Node.js v18+
- MongoDB (local or Atlas)

#### Backend
```bash
cd api
npm install
cp .env.example .env   # set up your environment variables
npm run dev
```

#### Frontend
```bash
cd web
npm install
npm run dev
```

#### Environment variables (`.env`)
```
MONGODB_URI=mongodb://localhost:27017/vagalume
SESSION_SECRET=your_secret_here
PORT=3000
```

---

### 📁 Project Structure

```
vagalume-app/
├── api/                        # Backend — Node.js + Express
│   ├── config/                 # Routes and config
│   ├── controllers/            # Business logic
│   ├── middlewares/            # Auth, roles, error handling
│   ├── models/                 # Mongoose schemas
│   └── app.js
│
├── web/                        # Frontend — React + Vite
│   └── src/
│       ├── components/         # Navbar, Chat...
│       ├── context/            # AuthContext
│       ├── pages/              # Home, Search, Property, Dashboard...
│       └── services/           # api-service.js
│
└── docs/                       # SPEC.md + API_DOCS.md
```

---

### 📄 Documentation

- [📘 API Documentation](./docs/API_DOCS.md)
- [📋 Product Spec (PRD)](./docs/SPEC.md)

---

### 👩‍💻 Author

**Bruna Martins**  
Bootcamp final project — Ironhack 2026  

---

*Made with 🌊 from Galicia*
