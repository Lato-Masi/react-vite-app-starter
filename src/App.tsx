// This is the main application component.
// It wraps the application's routes with an ErrorBoundary component.
// This ensures that any rendering errors in the application's components are gracefully handled,
// preventing the entire application from crashing.
import RenderRouter from "@/routes";
import ErrorBoundary from "./features/common/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RenderRouter />
    </ErrorBoundary>
  );
}

export default App;