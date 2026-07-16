# Retiro Despertar - Frontend Platform

Plataforma web premium, responsiva y altamente optimizada para la promoción, visualización de fechas e inscripción a los encuentros espirituales del **Retiro Despertar** (Yoga, Reiki y Constelaciones Familiares).

---

## 📂 Documentación del Proyecto

Usa la documentación detallada para entender a fondo las variables de entorno y los diagramas de base de datos relacionales:
*   📖 **[Manual de Instrucciones (docs/INSTRUCTIONS.md)](docs/INSTRUCTIONS.md)**: Guía detallada para la configuración local del entorno de desarrollo, instalación de dependencias y ejecución de comandos principales.
*   📐 **[Documento de Arquitectura (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md)**: Documentación técnica sobre la estructura del proyecto, flujo de datos, seguridad y decisiones de diseño arquitectónico.
*   🗃️ **[Script SQL de Base de Datos (docs/create_retreats_table.sql)](docs/create_retreats_table.sql)**: Estructura de tablas y datos semilla de prueba para Supabase SQL Editor.

---

## 🛠️ Tecnologías Utilizadas

- **Framework principal:** Next.js 15 (App Router - Standalone mode)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes y Iconos:** React 19 / Lucide React
- **Backend Serverless:** Supabase
- **Alojamiento Multimedia:** Cloudinary API

---

## 📋 Requisitos Previos

Asegúrate de contar con lo siguiente en tu entorno local antes de iniciar:
- **Node.js:** Versión 20 o superior (LTS recomendada).
- **Git** para clonar el repositorio.
- **Docker y Docker Compose** (Opcional, requerido para despliegues locales idénticos a producción).

---

## 🚀 Paso a Paso para Iniciar el Proyecto

### Paso 1. Clonar el repositorio
Abre tu terminal y ejecuta:
```bash
git clone <url_del_repositorio>
cd dani.retiro-despertar-front
```

### Paso 2. Instalar las dependencias
Instala los paquetes necesarios del proyecto utilizando `npm`:
```bash
npm install
```

### Paso 3. Configurar variables de entorno
Crea tu archivo `.env.local` tomando como plantilla el archivo de ejemplo:
```bash
cp .env.local.example .env.local
```
Abre `.env.local` en tu editor y completa las credenciales de Supabase y Cloudinary.

### Paso 4. Inicializar la Base de Datos (Supabase)
1. Ve a la consola web de tu proyecto de Supabase.
2. Abre el **SQL Editor** y crea una nueva consulta.
3. Copia y ejecuta el script contenido en [create_retreats_table.sql](docs/create_retreats_table.sql) para crear las tablas de `locations` y `retreats`, y habilitar las políticas de lectura RLS públicas.

### Paso 5. Ejecutar el Servidor de Desarrollo
Inicia Next.js en tu máquina local:
```bash
npm run dev
```
La aplicación estará disponible y corriendo en [http://localhost:3000](http://localhost:3000).

### Paso 6. Compilar y Desplegar con Docker (Producción)
Para construir la imagen standalone y levantar el contenedor de producción localmente:
```bash
docker-compose up --build
```
Esto creará el contenedor y expondrá el puerto `3000` con la configuración optimizada.
