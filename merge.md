# Merging a Google AI Studio Project

This document provides a comprehensive, step-by-step guide for merging a secondary React + Vite application, such as one developed in Google AI Studio, into this primary application. The objective is to create a single, cohesive, and deployable codebase while maintaining modularity and long-term maintainability.

## Core Principles

*   **Modularity:** The secondary application's code should remain as self-contained as possible within the primary application's structure.
*   **Clarity:** The integration process should be clear, and the resulting code should be easy to understand and navigate.
*   **Consistency:** The merged application should adhere to the primary application's existing conventions and standards, as outlined in the `blueprint.md` document.

## Pre-merge Preparation: Standardizing the Source Project

Before you begin the merge process, ensure that the Google AI Studio project you are porting is structured in a standard and predictable way.

1.  **Isolate Source Code:** All of the application's source code, including all `.tsx`, `.ts`, and `.css` files, must be located within its `src/` directory.
2.  **Public Assets:** All static assets, such as images, fonts, and icons, must be located in the `public/` directory.
3.  **Dependencies List:** Have the `package.json` file from the Google AI Studio project readily available. This file is the source of truth for all of the project's dependencies.

## The Merge Process: A Detailed, Step-by-Step Guide

This process is designed to be as methodical and error-free as possible. Follow each step carefully.

### 1. Create a Dedicated Directory for the Merged Application

To maintain modularity and prevent file conflicts, we will place the incoming application's code into a dedicated sub-directory within the primary application's `src/` folder.

*   In the primary application's `src/` folder, create a new folder. A descriptive name like `google-ai-studio-app` is recommended.

    ```
    src/
    └── google-ai-studio-app/
    ```

*   **Action:** Copy the entire `src/` directory from your Google AI Studio project into this new `src/google-ai-studio-app/` folder. Do not copy any other files or folders from the Google AI Studio project at this time.

### 2. Merge Dependencies from `package.json`

This is a critical step that requires careful attention to detail. You will need to merge the dependencies from the secondary application's `package.json` into the primary one.

*   **Action:** Open both `package.json` files side-by-side. For each dependency in the Google AI Studio project's `dependencies` and `devDependencies` sections, do the following:
    *   If the dependency **does not** exist in the primary app's `package.json`, add it to the appropriate section (`dependencies` or `devDependencies`).
    *   If the dependency **does** exist, compare the version numbers. It is generally safe to use the higher version of the two, but be mindful of potential breaking changes. If you are unsure, it is best to consult the dependency's documentation.

*   **After merging, run the installer:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

### 3. Update Configuration for Module Aliasing

To make it easier to import files from the newly added sub-directory, we will create a path alias. This will allow you to write `import MyComponent from '@/google-ai-studio-app/components/MyComponent'` instead of using fragile and difficult-to-read relative paths like `import MyComponent from '../../google-ai-studio-app/...'`.

*   **Action 1: Update `tsconfig.json`**
    *   Add a new path to the `compilerOptions.paths` object.

        ```json
        // tsconfig.json
        "paths": {
          "@/*": ["./src/*"],
          "@google-ai-studio-app/*": ["./src/google-ai-studio-app/*"] // <-- Add this line
        }
        ```

*   **Action 2: Update `vite.config.ts`**
    *   Add a corresponding alias to the `resolve.alias` object.

        ```typescript
        // vite.config.ts
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
            '@google-ai-studio-app': path.resolve(__dirname, './src/google-ai-studio-app'), // <-- Add this line
          },
        },
        ```

### 4. Integrate Routing

The primary application uses `react-router-dom` for routing. We will add a new route that will render the secondary application.

*   **Identify the main component** of your Google AI Studio app. This is typically `App.tsx` or `main.tsx`.
*   **Action: Update `src/routes/index.tsx`**
    *   Import the main component from the secondary app.
    *   Add a new route. You can nest all of the secondary app's routes under a specific path, for example, `/ai-app`.

        ```tsx
        // src/routes/index.tsx
        import { Route, Routes } from "react-router-dom";
        import Welcome from "@/features/misc/pages/Welcome";
        import NotFound from "@/features/misc/pages/404";
        
        // Import the main component of the second app
        import AiApp from "@/google-ai-studio-app/App"; // Or the correct path to your app's entry point

        const AppRoutes = () => {
          return (
            <Routes>
              <Route path="/" element={<Welcome />} />
              {/* Add a route for the merged application */}
              <Route path="/ai-app/*" element={<AiApp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          );
        };
        
        export default AppRoutes;
        ```

    *Note: The `*` in `/ai-app/*` is a wildcard that allows the merged application to handle its own nested routes.*

### 5. Handle Static Assets and Styling

*   **Static Assets:** If your Google AI Studio project has files in a `public/` directory, move them to the primary application's `public/` directory. Be mindful of any file name conflicts.

*   **Styling:**
    *   If the secondary app has a global CSS file (e.g., `index.css`), import it into the primary app's `src/main.tsx`.
    *   **Conflict Warning:** Be aware that CSS class names can conflict. This project uses Tailwind CSS, which helps minimize CSS conflicts through utility classes. If the secondary app also uses Tailwind, you may need to merge the `tailwind.config.js` files. For standard CSS, consider adopting CSS Modules or ensuring that class names are unique.

### 6. Environment Variables

*   If your Google AI Studio project uses a `.env` file for environment variables, copy the variables from that file into the `.env` file of the primary application. As per Vite's convention, ensure that any variables that need to be exposed to the client-side code are prefixed with `VITE_`.

## Post-Merge Checklist

1.  **Install all dependencies:** `npm install` or `yarn install`
2.  **Run the dev server:** `npm run dev`. Open your browser's developer tools and check the console for any errors.
3.  **Fix Import Paths:** You will likely need to update import paths within the newly added files (`src/google-ai-studio-app/`). Use the `@google-ai-studio-app/` alias you created for cleaner and more maintainable imports.
4.  **Test Functionality:** Navigate to the new route (e.g., `/ai-app`) and thoroughly test the merged application. Pay close attention to routing, data fetching, and state management.
5.  **Build and Deploy:** Once you have confirmed that everything is working as expected locally, you can run `npm run build`. The output `dist` folder will contain the fully merged application, ready for deployment to Cloud Run or another hosting provider.
