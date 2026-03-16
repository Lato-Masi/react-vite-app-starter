# Merging a Google AI Studio Project

This document outlines the process for merging a secondary React + Vite application (from Google AI Studio) into this primary application. The goal is to create a single, cohesive codebase that can be deployed on a platform like Cloud Run, while keeping the projects modular and easy to maintain.

## Pre-merge Preparation: Standardizing the Source Project

To make this process repeatable and reliable, it's best to ensure the Google AI Studio project you are porting has a standard structure.

1.  **Isolate Source Code:** Ensure all of the application's source code is contained within its `src/` directory.
2.  **Public Assets:** All static assets (images, fonts, etc.) should be in the `public/` directory.
3.  **Dependencies List:** Have the `package.json` file from the Google AI Studio project readily available.

## The Merge Process: Step-by-Step

### 1. Create a Dedicated Directory

To avoid file conflicts and keep the projects distinct, we will place the incoming application's code into a dedicated sub-directory.

- In the primary application's `src/` folder, create a new folder. A descriptive name like `google-ai-studio-app` is recommended.

    ```
    src/
    └── google-ai-studio-app/
    ```

- **Action:** Copy the entire `src/` directory from your Google AI Studio project into this new `src/google-ai-studio-app/` folder.

### 2. Merge Dependencies

You will need to merge the dependencies from the secondary application's `package.json` into the primary one.

- **Action:** Open both `package.json` files. For each dependency in the Google AI Studio project:
    - If the dependency **does not** exist in the primary app's `package.json`, add it.
    - If the dependency **does** exist, ensure the version is compatible. It's generally safe to use the higher version of the two, but be mindful of breaking changes.

- **After merging, run the installer:**
    ```bash
    npm install
    ```

### 3. Update Configuration for Module Aliasing

To make importing files from the new sub-directory clean and simple, we'll create a path alias. This allows you to write `import MyComponent from '@/google-ai-studio-app/components/MyComponent'` instead of using messy relative paths like `import MyComponent from '../../google-ai-studio-app/...'`.

- **Action 1: Update `tsconfig.json`**
    - Add a new path to the `compilerOptions.paths` object.

    ```json
    // tsconfig.json
    "paths": {
      "@/*": ["./src/*"],
      "@google-ai-studio-app/*": ["./src/google-ai-studio-app/*"] // <-- Add this line
    }
    ```

- **Action 2: Update `vite.config.ts`**
    - Add a corresponding alias to the `resolve.alias` object.

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

The primary application uses `react-router-dom`. We will add a new route that will render the secondary application.

- **Identify the main component** of your Google AI Studio app (usually `App.tsx` or `main.tsx`).
- **Action: Update `src/routes/index.tsx`**
    - Import the main component from the secondary app.
    - Add a new route. You can nest all of the secondary app's routes under a specific path, for example, `/ai-app`.

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
    *Note: The `*` in `/ai-app/*` allows the merged application to handle its own nested routes.*

### 5. Handle Static Assets and Styling

- **Static Assets:** If your Google AI Studio project has files in a `public/` directory, move them to the primary application's `public/` directory.

- **Styling:**
    - If the secondary app has a global CSS file (e.g., `index.css`), import it into the primary app's `src/main.tsx`.
    - **Conflict Warning:** Be aware that CSS class names can conflict. This project uses Tailwind CSS, which helps minimize CSS conflicts through utility classes. If the secondary app also uses Tailwind, the configurations (`tailwind.config.js`) may need to be merged. For standard CSS, consider adopting CSS Modules or ensuring class names are unique.

### 6. Environment Variables

- If your Google AI Studio project uses a `.env` file for environment variables, copy the variables from that file into the `.env` file of the primary application. Ensure the variable names are prefixed with `VITE_` to be exposed to the client-side code, as per Vite's convention.

## Post-Merge Checklist

1.  **Install all dependencies:** `npm install`
2.  **Run the dev server:** `npm run dev`. Check the browser console for any errors.
3.  **Fix Import Paths:** You will likely need to update import paths within the newly added files (`src/google-ai-studio-app/`). Use the `@google-ai-studio-app/` alias you created for cleaner imports.
4.  **Test Functionality:** Navigate to the new route (e.g., `/ai-app`) and test the merged application thoroughly.
5.  **Build and Deploy:** Once everything is working locally, you can run `npm run build`. The output `dist` folder will contain the fully merged application, ready for deployment to Cloud Run or another hosting provider.
