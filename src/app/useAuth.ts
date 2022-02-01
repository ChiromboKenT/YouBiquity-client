import { useContext } from "react";
import { AuthContext } from "./AppAuthContext";

export const useAuth = () => useContext(AuthContext);
