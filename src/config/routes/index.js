import React from "react";
import { Link } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import BusinessDetailEdit from "../../page/businessDetailEdit";
import SignUp from "../../page/signup";
import DashboardContent from "../../page/dashboard";
import DashboardLayout from "../../common/DashboardLayout";
const Layout = React.lazy(() => import("./../../common/layout"));
const Crawled = React.lazy(() => import("../../page/crawled"));
const Content = React.lazy(() => import("../../page/content"));
const ViewEvent = React.lazy(() => import("../../page/viewEvent"));
const Imagegallery = React.lazy(() => import("../../page/imagegallery"));
const Buisnessuser = React.lazy(() => import("../../page/buisnessuser"));
const Login = React.lazy(() => import("../../page/login"));
const RoleProtectedRoute = React.lazy(() => import("./RoleProtectedRoute"));

export const PATHS = {
  dashboard: "/dashboard",
  crawled: "/dashboard/crawled",
  published: "/dashboard/published",
  login: "/login"
};

export const routeslist = [
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RoleProtectedRoute element={<Layout />} module="user"/>,
    children: [
      {
        path: "",
        element: <DashboardContent />,
      },
      {
        path: "crawled",
        element: <Crawled />,
      },
      {
        path: "published",
        element: <Content />,
      },
    ],
  },
  // @fixme new 404 page must be there
  {
    path: "*",
    element: (
      <>
        404, Page not found
        <Link to="/login">Go Home</Link>
      </>
    ),
  },
];
