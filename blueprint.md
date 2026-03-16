# Project Blueprint

## Overview

This is a React Vite application that uses TypeScript. The application includes user authentication, a dashboard, and a settings page. It also includes error handling with an error boundary component.

## Folder Structure

```
src/
├── App.tsx
├── App.test.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
├── assets/
│   └── react.svg
├── components/
│   └── ui/
│       └── Button.tsx
├── config/
│   └── http.tsx
├── lib/
│   └── api.ts
├── routes/
│   ├── PrivateRoute.tsx
│   └── index.tsx
├── test/
│   └── setup.ts
├── features/
│   ├── authentication/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   ├── common/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Navbar.tsx
│   ├── misc/
│   │   ├── pages/
│   │   │   ├── 404.tsx
│   │   │   └── Welcome.tsx
│   └── user/
│       └── pages/
│           └── Settings.tsx
```

## Components

### `App.tsx`

The main application component that renders the router.

### `main.tsx`

The entry point of the application. It renders the `App` component and wraps it with a `QueryClientProvider`, `BrowserRouter`, and `ErrorBoundary`.

### `Button.tsx`

An accessible button component built using `react-aria-components`.

### `Dashboard.tsx`

A common component that provides a dashboard layout.

### `ErrorBoundary.tsx`

A component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI.

### `Navbar.tsx`

A common component that displays the navigation bar.

### `PrivateRoute.tsx`

A component that protects routes that require authentication.

### `Login.tsx`

A page that allows users to log in.

### `Signup.tsx`

A page that allows users to sign up.

### `Settings.tsx`

A page that allows users to update their settings.

### `404.tsx`

A page that is displayed when a route is not found.

### `Welcome.tsx`

A page that is displayed when a user is not logged in.

## Libraries

- React
- React Router
- React Query
- Vite
- TypeScript
- Ant Design
- Lucide React
- Tailwind CSS
- React Aria
- Vitest
- React Testing Library
