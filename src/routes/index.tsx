import { lazy, FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import Login from "@/features/authentication/pages/Login";
import Welcome from "@/features/misc/pages/Welcome";
import Signup from "@/features/authentication/pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Settings from "@/features/user/pages/Settings";

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
  return element;
};

export default RenderRouter;
