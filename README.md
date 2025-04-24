#Estructura de carpetas

src/
├── assets/ # imágenes, fuentes, íconos SVG
├── components/ # Atómicos y genéricos (Button, Input, Modal)
├── features/ # Cada dominio/ficha funcional
│ ├── auth/ # login, registro, verificación por correo
│ │ ├── components/ # piezas específicas de auth
│ │ ├── hooks/ # useLogin, useRegister…
│ │ ├── api.ts # React Query hooks para auth
│ │ └── types.ts
│ ├── clients/ # CRUD de clientes
│ ├── invoices/ # facturas: creación, listado, detalle
│ ├── products/ # productos + categorías, stock bajo
│ ├── analytics/ # Gráficas de ganancias, KPIs
│ ├── notifications/ # lógica de notificaciones de stock
│ ├── ai/ # integraciones con OpenAI (consulta de datos)
│ └── history/ # historial de stock y compras
├── hooks/ # hooks genéricos (useFetch, useDebounce)
├── layouts/ # DashboardLayout, AuthLayout…
├── routes/ # definición de rutas con React Router
├── services/ # cliente HTTP (axios/fetch) y configuración global
├── store/ # (opcional) RTK store si usaras Redux Toolkit
├── styles/ # estilos globales, variables Tailwind config
├── utils/ # funciones puras (formatDate, calcTotals)
├── App.tsx # Entry component con Providers y Router
└── main.tsx # Punto de arranque (mount React + Tailwind)
