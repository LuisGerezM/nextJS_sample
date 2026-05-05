# Clean Architecture (Feature-Based & DDD Lite) para Frontend con Next.js 16

Este proyecto es un template/demostración técnica que implementa principios de **Clean Architecture** y **Domain-Driven Design (DDD) Lite**, pero adaptados a las necesidades modernas del Frontend mediante **Screaming Architecture** (Feature-Based Design).

Construido con **Next.js 16 (App Router)**, React 19, TypeScript estricto, React Hook Form, Zod y TailwindCSS + DaisyUI.

## 🌟 ¿Por qué esta arquitectura?

En la Arquitectura Limpia tradicional de Backend, el código suele agruparse en carpetas raíz por capas técnicas (`/presentation`, `/domain`, `/infrastructure`). **En el Frontend, esto genera "Folder Jumping"**: para modificar una sola funcionalidad (ej. un Login), tienes que navegar por 4 carpetas completamente separadas.

### Nuestra solución: Feature-Sliced Design + DDD Lite
Agrupamos el código por **Casos de Negocio (Features)**. Cuando ves la carpeta `src/features`, sabes exactamente de qué trata la app de un vistazo (Screaming Architecture).

Pero **dentro de cada Feature**, mantenemos vivas las capas de la Clean Architecture para garantizar un código testeable, mantenible y desacoplado.

## 📂 Estructura de Carpetas

```text
src/
 ├── app/                          # 🌐 Framework Layer (Solo Enrutamiento y Route Handlers)
 │    ├── (auth)/login/
 │    ├── dashboard/
 │    └── api/                     # Proxy a servicios externos
 │
 ├── features/                     # Business Logic Layer (Agrupado por Features)
 │    ├── auth/                    # Feature de Autenticación
 │    │    ├── domain/             # Reglas de negocio puro
 │    │    │   ├── models/
 │    │    │   │   └── auth-user.model.ts
 │    │    │   ├── repositories/
 │    │    │   │   └── auth.repository.ts
 │    │    │   └── schemas/
 │    │    │       └── login.schema.ts
 │    │    ├── data/               # Implementación e infraestructura
 │    │    │   ├── dto/
 │    │    │   │   └── auth-user.dto.ts
 │    │    │   ├── mappers/
 │    │    │   │   └── auth.mapper.ts
 │    │    │   ├── datasources/
 │    │    │   │   ├── auth.datasource.ts
 │    │    │   │   └── auth.datasource.impl.ts
 │    │    │   └── repositories/
 │    │    │       └── auth.repository.impl.ts
 │    │    └── presentation/       # React/Next.js
 │    │        ├── actions/
 │    │        │   └── login.action.ts
 │    │        └── components/
 │    │            └── login-form.tsx
 │    │
 │    └── user/                    # Feature de Usuario (Ejemplo de referencia)
 │         ├── domain/             # Capa de Dominio - Reglas de negocio puro
 │         │   ├── models/
 │         │   │   └── auth-user.model.ts
 │         │   ├── repositories/
 │         │   │   └── auth.repository.ts
 │         │   └── schemas/
 │         │       └── login.schema.ts
 │         ├── data/               # Capa de Datos - Implementación e infraestructura
 │         │   ├── dto/
 │         │   │   └── auth-user.dto.ts
 │         │   ├── mappers/
 │         │   │   └── auth.mapper.ts
 │         │   ├── datasources/
 │         │   │   ├── auth.datasource.ts
 │         │   │   └── auth.datasource.impl.ts
 │         │   └── repositories/
 │         │       └── auth.repository.impl.ts
 │         └── presentation/       # Capa de Presentación - React/Next.js
 │             ├── actions/
 │             │   └── login.action.ts
 │             └── components/
 │                 └── login-form.tsx
 │
 ├── shared/                       # Shared Layer (Código genérico y utilidades)
 │    ├── components/form/         # UI re-utilizable (Inputs, Labels, Buttons)
 │    ├── constants/               # Evitamos "Magic Strings" (Rutas, Nombres de cookies)
 │    └── interfaces/              # Interfaces globales compartidas
 │
 └── config/                       # Config Layer
      ├── envs/                    # Punto único de verdad para Variables de Entorno
      └── errors/                  # Gestor unificado de captura y log de errores
```

## 🏗️ Capas de la Clean Architecture Explicadas

Cada feature (ej. `src/features/user/`) se organiza internamente en 3 capas: **Domain**, **Data** y **Presentation**. Esto logra un **Vertical Slicing** perfecto con Clean Architecture por dentro de cada feature.

### 1. Capa de Dominio (`/domain`)
Es el corazón limpio de la app. **No depende de NADA externo.**
* **Models (`/domain/models`):** Definen cómo *nuestra aplicación* necesita la información (sin basura de APIs de terceros).
* **Repositories – Abstracción (`/domain/repositories`):** Clases abstractas que declaran el *contrato* de operaciones disponibles sobre la entidad (ej. `getUserDetails()`). No saben de dónde vienen los datos.
* Los **Schemas** (Zod), cuando apliquen, también viven aquí como reglas de validación del dominio.

### 2. Capa de Datos (`/data`)
Negocia con el mundo exterior. Implementa las abstracciones del dominio.
* **DTOs (`/data/dto`):** Modelan *exactamente* cómo viene la respuesta cruda de la API externa.
* **Mappers (`/data/mappers`):** Adaptadores (Patrón Adapter) que traducen el DTO externo a nuestro Domain Model. Si la API cambia mañana, **solo cambiamos el Mapper**.
* **Datasources (`/data/datasources`):** 
  - **Abstracción** (`user.datasource.ts`): Clase abstracta que define el contrato del origen de datos.
  - **Implementación** (`user.datasource.impl.ts`): La lógica real de red (`fetch`, Firebase, etc.).
* **Repositories – Implementación (`/data/repositories`):** Recibe un `Datasource` por constructor (**Inyección de Dependencias**), obtiene el DTO y usa el Mapper para devolver un Domain Model limpio.

### 3. Capa de Presentación (`/presentation`)
La capa de React y Next.js.
* **Actions (`/presentation/actions`):** Actúan como controladores. Instancian el Datasource y el Repository (inyección manual), invocan el método del repositorio y manejan errores. **No saben nada de URLs, fetch, ni DTOs.**
* **Components (`/presentation/components`):** Componentes React "tontos" que solo consumen Domain Models.
* **Hooks (`/presentation/hooks`):** Custom Hooks para lógica de UI.

### 🔄 Flujo de Datos Completo
```text
Action (Presentación) → Repository (Dominio/Abstracción) → RepositoryImpl (Data)
    → DatasourceImpl (Data/fetch) → DTO → Mapper → Domain Model → UI
```

### 💡 Ejemplo de Referencia: Feature `user/`
```typescript
// presentation/actions/get-user.action.ts
const datasource = new UserDatasourceImpl();
const repository = new UserRepositoryImpl(datasource);
const user = await repository.getUserDetails();
return { ok: true, data: user };
```
Si mañana cambia la API o el origen de datos, **solo se modifica el Datasource**. El Repository, los Models y la UI no se tocan.

---

## 🚀 Prácticas de Código (Implementadas)

* 🚫 **No Magic Strings:** Todo string hardcodeado (rutas, nombres de cookies) se exporta desde un `constants/`.
* 🔒 **Variables de Entorno Centralizadas:** `process.env` solo se lee en `src/config/envs/envs.ts`. El resto de la app consume este objeto. Previene errores tipográficos y facilita validaciones de entorno.
* 🛡️ **Manejo de Errores Unificado:** Toda acción asíncrona pasa por un manejador de errores estricto (`errorHandling`) que devuelve siempre una interfaz homogénea (`CatchErrorResponseIF`) con un código HTTP, severidad y un mensaje amigable para la UI.
* 🎭 **Proxy Pattern en Route Handlers:** Se evita exponer URLs externas reales al cliente. Todo pasa por `app/api/...` para proteger credenciales y ocultar la infraestructura externa.
* ⚡ **React 19 Hooks (`useTransition`):** Reemplazo de estados manuales de `loading` en favor de la concurrencia nativa de React y Next.js.

---

## 💻 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Lenguaje:** TypeScript Estricto
- **Estilos:** Tailwind CSS v4 + DaisyUI
- **Formularios:** React Hook Form + Zod Resolvers

## 🏃‍♂️ Cómo arrancar el proyecto

1. Instala las dependencias:
   ```bash
   bun install
   ```
2. Crea tu archivo de entorno:
   * Copia `.env.template` a `.env.local`
   * Completa la variable `NEXT_PUBLIC_API_BASE_URL` (por defecto `https://jsonplaceholder.typicode.com`).
3. Levanta el entorno de desarrollo:
   ```bash
   bun dev
   ```
4. Abre `http://localhost:3000` e inicia sesión con `Sincere@april.biz` (Usuario mockeado) para ver el flujo en acción.
