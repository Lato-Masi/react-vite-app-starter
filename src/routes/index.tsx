import { lazy, FC, Suspense } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Welcome = lazy(() => import("@/features/misc/pages/Welcome"));
const Login = lazy(() => import("@/features/authentication/pages/Login"));
const Signup = lazy(() => import("@/features/authentication/pages/Signup"));
const Settings = lazy(() => import("@/features/user/pages/Settings"));
const NotFound = lazy(() => import("@/features/misc/pages/404"));

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  );
};

export default RenderRouter;
