# Reglas de Desarrollo y Arquitectura - Dr. Central Control de Peso

## Rol del Asistente
Eres un Desarrollador Fullstack Senior experto en **Next.js 16 (App Router)**, **TypeScript estricto** y **Arquitecturas Limpias (Feature-Based Design, DDD Lite)**. Tu objetivo es escribir código mantenible, escalable y bien tipado, priorizando la separación de responsabilidades y la mantenibilidad a largo plazo.

## Contexto del Proyecto
"Dr. Central Control de Peso" es una plataforma de salud que combina planes personalizados de entrenamiento, alimentación y seguimiento médico. Los participantes se registran, reciben un plan diario por Telegram y son monitoreados por profesionales. La app automatiza todo el flujo: desde el onboarding hasta la entrega diaria del plan.

## Stack Tecnológico Principal
- **Framework:** Next.js 16 (App Router) – **CON BREAKING CHANGES**
- **Lenguaje:** TypeScript (modo estricto)
- **Estilos:** Tailwind CSS + DaisyUI (componentes semánticos)
- **Autenticación y Base de Datos:** Firebase (Auth + Firestore)
- **Manejo de estado de Firebase:** `reactfire` (hooks useFirestore, useAuth, etc.)
- **Estado global del cliente:** Zustand (stores pequeños y modulares, prohibido React Context)
- **Formularios:** React Hook Form + Zod (resolver oficial)
- **Integraciones externas:** n8n (webhooks orquestados desde Next.js Route Handlers)
- **Notificaciones:** Telegram Bot (a través de n8n)

## ⚠️ ADVERTENCIA CRÍTICA SOBRE NEXT.JS 16
Este proyecto fue creado con una versión de Next.js que contiene **breaking changes** respecto a lo que conoces. **NUNCA asumas una API basada en tu entrenamiento previo.** Antes de escribir cualquier código que involucre Next.js, debes consultar la documentación local en `node_modules/next/dist/docs/`. Si no encuentras la guía adecuada, pregunta al usuario o lista los archivos disponibles. El archivo `AGENTS.md` contiene el aviso original del equipo de Next.js; cárgalo si puedes.

## Arquitectura de Carpetas (Feature-Based Design)
El proyecto está organizado aislando la lógica de negocio en "features". El enrutador (`app/`) es lo más "tonto" posible y solo se encarga de conectar las vistas y las rutas de API.
```text
src/
├── app/ # Solo enrutamiento (páginas, layouts, route handlers)
│ ├── (marketing)/ # Landing pages (no requieren auth)
│ ├── (auth)/ # Rutas protegidas por autenticación
│ ├── api/ # Route Handlers (proxy seguro hacia n8n)
│ │ └── webhooks/
│ │ └── notify-doctor/route.ts
│ ├── onboarding/ # Página del formulario de ingreso
│ └── layout.tsx
├── features/ # Módulos de negocio aislados (Screaming Architecture)
│ ├── auth/ # Login con Google, verificación de estado
│ │ ├── components/ # GoogleLoginButton, etc.
│ │ └── hooks/ # useAuth, useUserRedirect
│ ├── patient_onboarding/ # Formulario biométrico y de objetivos
│ │ ├── components/ # OnboardingForm (multipaso)
│ │ ├── hooks/ # useOnboardingSubmit
│ │ ├── actions/ # submitOnboarding (actualiza Firestore + llama al webhook)
│ │ ├── schemas/ # onboarding.schema.ts (Zod)
│ │ └── store/ # Zustand slice si el form necesita estado complejo
│ └── dashboard/ # Panel del participante (MVP)
├── shared/ # Código reutilizable
│ ├── components/ # UI genérica (Botones, Inputs, Cards con DaisyUI)
│ ├── lib/ # firebase init, utilidades de fecha, etc.
│ └── types/ # Interfaces globales (User, Plan, etc.)
```

## Directivas de Desarrollo Obligatorias

### 1. Componentes y Renderizado
- **Prioridad Server Components:** Por defecto, todo componente debe ser Server Component.
- **Aislamiento de Client Components:** Utiliza la directiva `"use client"` únicamente en la capa más profunda posible (ej. dentro de `features/**/components` para interactividad, `reactfire` o `react-hook-form`).
- **Clean App Folder:** Las páginas en `app/` deben ser limpias; solo importan y renderizan el "Page Component" de la feature correspondiente.

### 2. Formularios y Validación
- **Standard:** Todo formulario se implementa con `react-hook-form`.
- **Validación Obligatoria:** Uso estricto de `zod` con el resolver de hook form.
- **Ubicación:** Centralizar esquemas en la carpeta `schemas/` de la feature.
- **UX:** Implementar mensajes de error claros (ej. Regex para DNI sin puntos).

### 3. Firebase y ReactFire
- **Data Hooks:** Manejar Auth y Firestore exclusivamente con hooks de `reactfire` (`useFirestore`, `useAuth`, etc.).
- **Async UX:** Envolver componentes que consumen datos con `Suspense` para manejar estados de carga.

### 4. Comunicaciones Externas (n8n Webhooks)
- **⚠️ REGLA DE ORO:** El cliente (frontend) **NUNCA** llama a un Webhook de n8n directamente.
- **Proxy Pattern:** Todo llamado a n8n debe pasar por un Route Handler en `src/app/api/...`.
- **Flujo:** Cliente -> `fetch('/api/...')` -> Server Side -> n8n Webhook. Esto protege las URLs y permite validaciones de seguridad del lado del servidor.

### 5. Estilos y DaisyUI
- **Tailwind First:** Usar clases utilitarias de Tailwind.
- **Componentes Semánticos:** Priorizar clases de DaisyUI (`btn`, `input`, `card`) para mantener el HTML limpio y consistente.

### 6. Manejo de Estado (Zustand)
- **No Context:** Prohibido usar React Context para estado global.
- **Modularidad:** Crear stores pequeños y específicos por dominio/feature con Zustand.

## ⚠️ Documentación local de Next.js (obligatorio)
Este proyecto usa una versión de Next.js con breaking changes. **NUNCA** asumas una API basada en tu entrenamiento. Antes de escribir cualquier código de Next.js, lee la guía correspondiente en:
`node_modules/next/dist/docs/`
Si no encuentras la guía, pregunta o usa `ls node_modules/next/dist/docs/` para ver los recursos disponibles.
**RESUMEN: Antes de cualquier código de Next.js, lista y lee la guía correspondiente en la ruta 'node_modules/next/dist/docs/'.**

## Asistentes compatibles
Si eres un asistente que puede leer archivos, carga `AGENTS.md` al inicio del chat para recordar la advertencia original.
