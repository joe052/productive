This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Recommended Production-Level File Organization

Here is a comprehensive, production-ready structure that combines the App Router's conventions with best practices for scalability.

```txt
.
├── /public/                      # Static assets (images, fonts, etc.)
├── /src/                         # Optional but recommended 'src' directory
│   ├── /app/                     # The core of your application and routing
│   │   ├── /api/                 # Route Handlers for your API endpoints
│   │   │   └── /users
│   │   │       └── route.ts      # -> /api/users
│   │   │
│   │   ├── /(main)/              # A Route Group for main app pages (e.g., with main navbar/footer)
│   │   │   ├── /dashboard/       # FEATURE: Dashboard (Route: /dashboard)
│   │   │   │   ├── page.tsx      # UI for the page
│   │   │   │   ├── layout.tsx    # Layout specific to this feature
│   │   │   │   ├── loading.tsx   # Loading UI specific to this feature
│   │   │   │   ├── /components/  # Components used ONLY within the dashboard feature
│   │   │   │   │   ├── StatCard.tsx
│   │   │   │   │   └── ProjectList.tsx
│   │   │   │   ├── _actions.ts   # Server Actions (private to this feature)
│   │   │   │   └── _lib.ts       # Utility functions (private to this feature)
│   │   │   │
│   │   │   ├── /settings/        # FEATURE: Settings (Route: /settings)
│   │   │   │   ├── page.tsx
│   │   │   │   └── ... (similar structure as dashboard)
│   │   │   │
│   │   │   └── page.tsx          # Homepage UI (Route: /)
│   │   │
│   │   ├── /(auth)/              # A Route Group for auth pages (e.g., with a different, simpler layout)
│   │   │   ├── /login/
│   │   │   │   └── page.tsx
│   │   │   ├── /signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx        # Shared layout for ONLY login and signup
│   │   │
│   │   ├── layout.tsx            # ROOT layout (applies to everything)
│   │   └── globals.css           # Global styles
│   │
│   ├── /components/              # SHARED, Reusable Components
│   │   ├── /ui/                  # Primitive, "dumb" components (like a design system)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── /shared/              # Complex components composed of UI primitives
│   │   │   ├── MainNav.tsx
│   │   │   └── PageHeader.tsx
│   │
│   ├── /lib/                     # SHARED helper functions, libraries, SDKs
│   │   ├── db.ts                 # Database client (Prisma, Drizzle, etc.)
│   │   ├── auth.ts               # Auth configuration (NextAuth.js, Clerk)
│   │   ├── utils.ts              # General utility functions (formatting, etc.)
│   │
│   ├── /hooks/                   # SHARED custom React hooks
│   │   ├── use-user.ts
│   │   └── use-media-query.ts
│   │
│   ├── /store/                   # Global state management (Zustand, Redux, Jotai)
│   │   └── user-store.ts
│   │
│   ├── /types/                   # Shared TypeScript type definitions
│   │   └── index.ts
│   │
│   └── /constants/               # Application-wide constants
│       └── index.ts
│
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

### Explanation of Key Directories

1.  **`src/` directory**: While optional, it's highly recommended. It clearly separates your source code from configuration files at the root, leading to a cleaner project.

2.  **`app/`**: This is the heart of the App Router.
    *   **Route Groups `(...)`**: Folders wrapped in parentheses, like `(main)` or `(auth)`, organize your routes without affecting the URL. This is perfect for applying different layouts to different sections of your app. For example, your main app pages have a full navbar, while your login/signup pages have a simple, centered layout.
    *   **Feature Folders (`dashboard/`, `settings/`)**: These are your route segments. By adopting the colocation model, each folder becomes a mini-application responsible for its own UI, logic, components, and data fetching.
    *   **Private Folders `_...`**: Prefixing a folder with an underscore (e.g., `_lib`, `_components`) prevents Next.js from treating it as a URL segment. While the convention is to use `components/` directly, using `_` for non-component files like `_actions.ts` or `_lib.ts` is a great way to signal that they are internal implementation details of that feature and not routable.

3.  **`components/`**: This is for **truly shared and reusable components**.
    *   **`/ui`**: For your base design system components (often called atoms). These are highly reusable and application-agnostic (e.g., `Button`, `Dialog`, `Input`). Tools like `shadcn/ui` populate this directory.
    *   **`/shared`**: For more complex components that are used in multiple places but are specific to your application's domain (e.g., `SiteHeader`, `UserAvatarMenu`).

4.  **`lib/`**: Your global library. This is for code that can be used anywhere, both on the client and the server. Think database initializations, authentication helpers, and globally used utility functions.

5.  **`hooks/`, `store/`, `types/`, `constants/`**: These folders are for cross-cutting concerns. They are organized by their *type* because they are, by definition, meant to be shared across many different *features*.

### Summary: The "Best Way"

1.  **Embrace File-System Routing**: Don't fight it. Use the route folders (`app/dashboard`, `app/settings`) as the foundation.
2.  **Colocate by Feature**: Make each route folder a self-contained module. Place components, server actions, and helper functions related to that feature *inside* its folder. This is the single most important principle for scalability.
3.  **Use Route Groups `(...)` for Layouts**: Organize sections of your app that share a common layout (e.g., `(main)` vs. `(auth)`) without changing the URL.
4.  **Distinguish Shared vs. Local**: Have a top-level `/components` folder for truly reusable UI and use local `components/` folders inside feature routes for single-purpose components.
5.  **Use a `src/` Directory**: Keep your project root clean.

By following this structure, your application will be organized, easy to navigate, and built to scale with your team and your codebase.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
