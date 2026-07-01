# 🌐 Anti-Social Net

Trabajo Práctico N°2 - Construcción de Interfaces de Usuario

## 📖 Descripción

Anti-Social Net es una aplicación web desarrollada con React y TypeScript que simula una red social. Los usuarios pueden registrarse, iniciar sesión, visualizar publicaciones, comentar publicaciones existentes y crear nuevas publicaciones propias.

La aplicación consume una API REST provista para la materia y utiliza Context API para la gestión de sesiones de usuario.

---

## 🚀 Tecnologías Utilizadas

- React
- TypeScript
- React Router DOM
- React Bootstrap
- Context API
- Fetch API
- LocalStorage
- Vite

---

## ✨ Funcionalidades

### 🔐 Inicio de Sesión

- Login mediante nickName.
- Validación local de contraseña.
- Persistencia de sesión mediante LocalStorage.
- Rutas protegidas para usuarios autenticados.

### 👤 Registro de Usuario

- Creación de nuevos usuarios.
- Validación de campos obligatorios.
- Manejo de errores devueltos por la API.
- Sugerencias automáticas de nickName en caso de conflicto.

### 🏠 Home

- Visualización del feed de publicaciones.
- Información de usuarios.
- Etiquetas asociadas a publicaciones.
- Cantidad de comentarios.
- Acceso al detalle de cada publicación.

### 📝 Detalle de Publicación

- Visualización completa del contenido.
- Listado de comentarios.
- Creación de nuevos comentarios.
- Información de autor y etiquetas.

### 👤 Perfil de Usuario

- Vista protegida.
- Visualización de publicaciones propias.
- Acceso rápido a creación de publicaciones.
- Gestión de sesión.

### ➕ Nueva Publicación

- Creación de publicaciones.
- Asociación de imágenes mediante URL.
- Selección de etiquetas disponibles desde la API.
- Redirección al perfil una vez creada la publicación.

---

## 📂 Estructura del Proyecto

```text
src/
│
├── components/
│   ├── Navbar.tsx
│   ├── PostCard.tsx
│   └── ProtectedRoute.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegistroPage.tsx
│   ├── ProfilePage.tsx
│   ├── PublicacionPage.tsx
│   └── DetallePostPage.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

### 2. Ingresar al proyecto

```bash
cd antihur-social
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## 🔌 API Utilizada

Backend proporcionado para la materia:

```text
http://localhost:3001
```

Repositorio:

https://github.com/lucasfigarola/backend-api

usamos las api:
 DiceBear(https://api.dicebear.com/) para los avatares 
  
Lorem Picsum(https://picsum.photos/) para las imagenes

---

## 🔑 Credenciales de Prueba

Para iniciar sesión:

```text
Contraseña: 123456
```

El usuario debe existir previamente en la base de datos.

---

## 📸 Capturas

Se pueden agregar capturas de:

- Home
- Login
- Registro
- Perfil
- Nueva Publicación
- Detalle de Publicación

---

## 👨‍💻 Integrantes

 Uriel Zagert Hollmann
 Gaton Belardes
 Tobias Ramirez
 Agustin Frecha


---

## 📚 Materia

Construcción de Interfaces de Usuario

Universidad Nacional de Hurlingham (UNAHUR)