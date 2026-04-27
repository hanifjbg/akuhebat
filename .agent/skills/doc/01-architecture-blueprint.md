# Architecture Blueprint: AKU HEBAT PWA

## 1. System Architecture
- **Pattern**: Modular Monolith + Domain Driven Design (DDD).
- **Core Principle**: Separation of concerns. Modules cannot import directly from one another. All cross-module communication is handled via the Event Bus.

## 2. Directory Structure (/src)
- **app/**: Routes, providers, global error boundaries.
- **core/**: Singleton services (EventDispatcher, AudioAdapter, ApiClient, FirebaseConfig).
- **modules/**: Business logic isolates (word-bank, quiz-engine, gamification).
- **shared/**: Utilities, constants, UI Kit (shadcn wrappers).
- **ui/**: Atomic Design components (atoms, molecules, organisms, templates).
- **pages/**:
  - `main/`: Kids Area (Claymorphism, Playful).
  - `admin/`: Admin Dashboard (Neutral, Sharp).
  - `ux-lab/`: UI testing, state simulation, and dev navigation.

## 3. Tech Stack
- Frontend: React 19, Vite, Tailwind CSS, Framer Motion, shadcn/ui.
- State: Zustand (separated stores for Auth, Session, Admin, UX-Lab).
- Schema/Validation: Zod.
- Testing: Vitest, React Testing Library, Cypress.

## 4. Communication Protocol
Modules dispatch events like `QUIZ_COMPLETED` or `LEVEL_UP`. Other services listen to these events to avoid tight coupling.
