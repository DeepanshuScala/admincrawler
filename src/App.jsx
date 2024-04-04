import React, { Suspense, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import PinnTagApp from "./PinnTagApp";
import { AuthProvider } from "./context/authContext";
import PrimaryLoader from "./common/Loader/PrimaryLoader";

const App = () => {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate={true}
        variant={"info"}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <AuthProvider>
          <Suspense fallback={<PrimaryLoader />}>
            <PinnTagApp />
          </Suspense>
        </AuthProvider>
      </SnackbarProvider>
    </div>
  );
};

export default App;
