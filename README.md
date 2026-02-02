# RemorasApp – Guía de instalación y estado actual (2026-02-02)

## Contexto del proyecto

Este proyecto es una aplicación móvil desarrollada con **Expo + Expo Router**, migrada desde una arquitectura anterior basada en **App.tsx** y navegación manual con React Navigation.

### Importante

El proyecto **ya NO usa `App.tsx`**.  
La navegación se basa completamente en **Expo Router (file-based routing)**.

---

## Stack tecnológico actual

- **Node.js**: 18.x o superior (LTS recomendado)  
  Versión usada al redactar este README: **24.13.0 LTS**
- **Expo**: SDK 54
- **React Native**: 0.81.x
- **Expo Router**: 6.x
- **Yarn**: Classic (sin PnP)
- **TypeScript**
- **NativeWind**: temporalmente deshabilitado (ver más abajo)

---

## Estructura del proyecto (estado actual)

```text
RemorasApp/
│
├── app/                     # Navegación principal (Expo Router)
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Layout de tabs
│   │   ├── index.tsx        # Pantalla Inicio
│   │   └── explore.tsx      # Placeholder
│   ├── modal.tsx            # Modal de ejemplo (simplificado)
│   └── _layout.tsx          # Layout raíz (Stack)
│
├── src/                     # Código migrado del proyecto anterior
│   ├── api/                 # Clientes y llamadas HTTP
│   ├── hooks/               # Hooks personalizados
│   ├── components/          # Componentes reutilizables (NO template Expo)
│   ├── utils/               # Utilidades
│   └── types/               # Tipos TypeScript
│
├── assets/
├── package.json
├── babel.config.js
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Cómo levantar el proyecto (paso a paso)

### Requisitos previos

- Node.js 18.x o superior

- Yarn instalado globalmente

- Expo CLI (opcional, pero recomendado)

npm install -g expo-cli

### Instalación limpia (IMPORTANTE)

Este proyecto NO usa Yarn PnP.

Si existen archivos o carpetas como:

- .pnp.cjs

- .yarn/unplugged

- .yarn/cache

elimínalos antes de continuar:

rm -rf .yarn .pnp.cjs

Luego instala dependencias:

yarn install

### Levantar el proyecto

yarn start
o
npx expo start

## Estado actual esperado

Si todo está correcto, deberías ver:

La app levanta sin errores

Tabs visibles en la parte inferior

Pantalla Inicio con el mensaje:

"App levantó correctamente"

Este es el estado base validado del proyecto.

## Sobre NativeWind (MUY IMPORTANTE)

NativeWind NO está activo actualmente, por decisión técnica.

### Motivo

Durante la migración se detectaron conflictos críticos entre:

- NativeWind

- Expo Router

- Babel

- PostCSS

Estos conflictos impedían que la app levantara correctamente.

### Decisión

NativeWind fue desacoplado temporalmente para priorizar:

- navegación estable

- estructura clara

- pantallas funcionales

### Advertencia

Por ahora, NO agregar lo siguiente en babel.config.js:

plugins: ['nativewind/babel']

NativeWind será reintroducido más adelante, con configuración correcta y controlada.

## Cambios importantes respecto al proyecto anterio

### Ya NO existe:

App.tsx

NavigationContainer

Stack / BottomTabs manuales

carpeta screens/

carpeta navigation/

### Ahora se usa

Expo Router

navegación basada en archivos

**Ejemplos:**

- app/index.tsx → /
- app/equipos/index.tsx → /equipos
- app/equipos/[id].tsx → /equipos/123

## Estado de la migración

Base funcional

Navegación estable

Código antiguo conservado en src/

### Pendiente

Migrar pantallas desde src/

Reintroducir estilos (NativeWind)

Ajustar hooks que dependan de navegación antigua

## Nota para el futuro desarrollador

Si llegaste aquí y:

- pensaste que algo estaba roto

- o que faltaba configuración

No estás loco/a.

Este README existe porque sí fue difícil llegar hasta aquí.

**Recomendaciones:**

1. Sigue el orden indicado

2. No intentes “arreglar Babel” a ciegas

3. Consulta antes de reactivar NativeWind

_Proyecto estabilizado tras una migración compleja, con especial cuidado en no repetir errores estructurales del template inicial._
