# Group 5 E-commerce — Frontend (Sprint 2)

The web client for the Group 5 e-commerce platform. A single-page application built with
React 19 and Vite, styled with Tailwind CSS v4. It talks to the
[backend API](https://github.com/toonajuig/group5-ecommerce-backend-sprint3) for products, carts, orders, and authentication.

## Tech Stack

- **React 19** + **Vite 8** — SPA with HMR
- **React Router 7** — client-side routing (`createBrowserRouter`)
- **Tailwind CSS v4** (`@tailwindcss/vite`) — styling
- **Radix UI** / **Base UI** + `class-variance-authority`, `clsx`, `tailwind-merge` — UI primitives
- **lucide-react** — icons
- **react-hook-form** + **zod** (`@hookform/resolvers`) — forms & validation
- **recharts** — admin dashboard charts
- **sonner** — toast notifications
- **embla-carousel-react**, **vaul**, **cmdk**, **input-otp** — assorted UI components

## Getting Started

### Prerequisites
- Node.js 18+
- The backend API running locally (default `http://localhost:3000`)

### Install & run

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:3000/api
```

If `VITE_API_URL` is not set, the app falls back to `http://localhost:3000/api`
(see [src/utils/api.js](src/utils/api.js)).

## Project Structure

```
src/
├── App.jsx                # Root layout (NavBar + Outlet + Footer)
├── main.jsx               # Router definition & context providers
├── components/
│   ├── layout/            # NavBar, Footer
│   ├── screens/desktop/   # Page-level screens (Home, Catalog, Cart, etc.)
│   │   └── admin/         # Admin dashboard pages
│   └── ui/                # Reusable UI primitives (Button, Card, ProductCard…)
├── context/               # AuthContext, CartContext
├── hooks/                 # Custom hooks (use-mobile…)
├── services/              # API service modules (auth, product, cart, order…)
├── utils/api.js           # fetch wrapper (sends cookies via credentials)
├── data/                  # Mock data
├── lib/utils.js           # cn() helper (clsx + tailwind-merge)
└── tokens/theme.js        # Design tokens
```

## Routing

Routes are defined in [src/main.jsx](src/main.jsx) and grouped by access level
via wrapper routes in [src/routes/ProtectedRoutes.jsx](src/routes/ProtectedRoutes.jsx):

| Path | Access | Screen |
| --- | --- | --- |
| `/` | Public | Home |
| `/catalog` | Public | Product catalog |
| `/product/:id` | Public | Product detail |
| `/bmi` | Public | BMI tool |
| `/login`, `/register` | Guest only | Auth screens |
| `/cart`, `/payment`, `/payment-success` | Private | Checkout flow |
| `/tracking`, `/profile` | Private | Order tracking, profile |
| `/admin`, `/admin/products`, `/admin/orders`, `/admin/customers` | Admin only | Admin dashboard |

- **GuestRoute** — redirects authenticated users away from login/register
- **PrivateRoute** — requires a logged-in user
- **AdminRoute** — requires a user with the `admin` role

## Authentication

Auth state is managed by `AuthContext`. The API is called through
[src/utils/api.js](src/utils/api.js), which sends every request with
`credentials: "include"` so the backend's `accessToken` cookie is attached
automatically — no token is stored in client-side storage.
