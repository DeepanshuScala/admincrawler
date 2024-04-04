import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routeslist } from "./config/routes";

const PinnTagApp = () => {
  const router = createBrowserRouter(routeslist);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default PinnTagApp;
