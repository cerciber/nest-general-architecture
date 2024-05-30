# nest-general-architecture

General architecture for Nest.js with TypeScript implementing 3 Layered Architecture. Node.js.

## General structure

/project-root
│
├── src
│ ├── common
│ │ ├── decorators
│ │ ├── dto
│ │ ├── exceptions
│ │ ├── filters
│ │ ├── guards
│ │ ├── interceptors
│ │ ├── middlewares
│ │ └── pipes
│ │
│ ├── config
│ │ └── (config files)
│ │
│ ├── modules
│ │ ├── auth
│ │ │ ├── controllers
│ │ │ ├── dto
│ │ │ ├── entities
│ │ │ ├── services
│ │ │ └── auth.module.ts
│ │ │
│ │ ├── users
│ │ │ ├── controllers
│ │ │ ├── dto
│ │ │ ├── entities
│ │ │ ├── services
│ │ │ └── users.module.ts
│ │ │
│ │ └── (other modules)
│ │
│ ├── shared
│ │ ├── (shared modules, services, etc.)
│ │
│ ├── app.module.ts
│ ├── main.ts
│ └── (other src-level files)
│
├── test
│ ├── (unit and integration tests)
│
├── (other root-level files)
