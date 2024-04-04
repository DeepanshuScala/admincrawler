import { createContext, useContext, useEffect, useState } from "react";
import { getData, getDataTemp } from "../utils/api";
import { enqueueSnackbar } from "notistack";
import { getBusinessProfile } from "../utils/localStorage";
import { PINNTAG_USER } from "../config/routes/RoleProtectedRoute";

export const AuthContext = createContext();
// export const AuthContext = createContext({
//   user: {},
//   isLoadingUser: false,
// });

export const useAuthentication = () => {
  const context = useContext(AuthContext);

  //   if (!context) {
  //     throw new Error(
  //       "useAuthContext .. must be used with in a AuthContextProvider."
  //     );
  //   }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const de = JSON.parse(localStorage.getItem(PINNTAG_USER));

  const fetchUserDetails = async () => {
    setUser(de.user);
    setLoading(false);
  };

  useEffect(() => {
    if(localStorage.getItem(PINNTAG_USER)){
      fetchUserDetails();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isLoadingUser: loading,
        fetchUserDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
