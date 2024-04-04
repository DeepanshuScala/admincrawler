import React from "react";
import { useAuthentication } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import PrimaryLoader from "../../common/Loader/PrimaryLoader";

const GuestRoute = ({ element }) => {
  const { user, isLoadingUser } = useAuthentication();

  if (isLoadingUser) {
    return <PrimaryLoader />;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }else {
    return element;
  }
};

export default GuestRoute;
