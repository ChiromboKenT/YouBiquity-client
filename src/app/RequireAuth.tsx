import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AppAuthContext";
import { useAuth } from "./useAuth";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useContext(AuthContext);

  let location = useLocation();

  if (!auth || !auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.

    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default RequireAuth;
