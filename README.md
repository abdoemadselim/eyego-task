# EyeGo Task
 a dashboard built with Next.js 15, TypeScript, and Redux Toolkit. The application provides authentication, product management with filtering, sorting and pagination, data export capabilities, and chart visualization.

---
## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher
- **npm**: v9 or higher (comes with Node.js)
- **Docker** (optional)
- **Docker Compose** (optional)

---

## Setup Instructions

### Option 1: Local Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:abdoemadselim/eyego-task.git
   cd eyego-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Backend API URL
   API_URL=https://products-repo-production.up.railway.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Option 2: Docker Deployment

1. **Clone the repository**
   ```bash
   git clone git@github.com:abdoemadselim/eyego-task.git
   cd eyego-task
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker compose up -d
   ```

   The application will be available at `http://localhost:3000`

3. **Stop the application**
   ```bash
   docker compose down
   ```
---

## Implementation Approach

### Architecture Overview

- This application follows a **feature-based architecture** making it scalable, reusable, and maintainable
- the /app directory contains all the routes, while each feature includes its pages, components, service, etc.
- Tanstack table is used to add powerful tables
- Pagination is implemented via sending page + pageSize to backend which returns the products page data + total count
- Sorting is implemented via sending sortBy + sortOrder to backend
- Searching/filtering works on product name + description with PostgreSQL full text search

### Technology Stack

**Frontend Framework:**
- **Next.js 15**
- **React 19**
- **TypeScript**

**State Management:**
- **Redux Toolkit**
- **RTK Query**: data fetching and mutation with caching solution

**UI & Styling:**
- **Lucide Icons**: Beautiful, consistent icon library
- **Shadcn**: Out-of-the-box quality components
- **Recharts**: Composable charting library for data visualization

**Form Management:**
- **React Hook Form**: Eases the management and validation of form data in React applications and prevents unnecessary re-renders
- **Zod**: TypeScript-first schema validation

**Data Export:**
- **SheetJS (xlsx)**: Excel file generation
- **jsPDF + autotable**: PDF generation with table layouts

**Deployment:**
- **Docker**
- **Docker Compose**

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/                # Dashboard pages
│   │   └── products/
│   └── layout.tsx                # Root layout
│
├── features/                     # Feature-based modules
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Feature-specific components
│   │   ├── pages/                # Feature pages
│   │   ├── schema/               # Zod validation schemas
│   │   ├── service/              # RTK Query API definitions
│   │   ├── store/                # Redux slices
│   │   └── types/                # TypeScript types
│   │
│   ├── products/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── service/
│   │   ├── types/
│   │   └── utils/                # Export utilities
│   │
│   └── analytics/                # Analytics feature
│       └── components/           # Charts and visualizations components
│
├── shared/                       # Shared/common modules
│   ├── components/               # Reusable UI components
│   │   ├── data-table/          # Generic data table components
│   │   ├── layout/              # Layout components (e.g., sidebar, navbar)
│   │   └── ui/                  # Base UI components (e.g., buttons, dialogs, dropdowns, etc.)
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # Shared TypeScript types
│   └── utils/                   # Utility functions
│
├── store/                       # Redux store configuration
├── providers/                   # React context providers
└── fonts/                       # Font configurations
```

### Design Decisions

#### 1. Redux Toolkit Query for API Management
RTK Query provides:
- Built-in caching
- Auto-generated React hooks
- Loading and error states management

**Example from `auth.service.ts`:**
```typescript
login: builder.mutation<User, LoginType>({
  query: (credentials) => ({
    url: '/login',
    method: 'POST',
  }),
  transformResponse: (response: AuthResponse) => response.data.user,
  invalidatesTags: ['Auth'],
})
```

#### 2. Type-Safe Schema Validation
```typescript
// Schema definition with Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

// TypeScript type automatically inferred
type LoginType = z.infer<typeof loginSchema>
```

#### 3. API Proxying via Next.js Rewrites
The application proxies API requests through Next.js:
```typescript
// next.config.ts
async rewrites() {
  return [{
    source: "/api/:path*",
    destination: `${process.env.API_URL}/:path*`
  }]
}
```
**Benefits:**
- Avoids CORS issues in development
- Hides backend URL from client

#### 4. Docker Multi-Stage Builds
The Dockerfile uses three stages:
1. **deps**: Installs dependencies
2. **builder**: Builds the Next.js application
3. **runner**: Creates minimal production image

**Benefits:**
- Smaller final image size (~150MB vs ~1GB)
- Faster deployments
- Layer caching for faster rebuilds


#### 5. Debounced Search Implementation
Search uses the `use-debounce` library to optimize API calls:
```typescript
const [debouncedSearch] = useDebounce(searchValue, 150)
```

**Benefits:**
- Reduces unnecessary API calls
- Improves performance
- Lower server load

### API Integration

The application integrates with a backend API through these endpoints:

**Authentication:**
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user to verify the session on app mounting

**Products:**
- `GET /products` - List products with pagination, search, and sorting
