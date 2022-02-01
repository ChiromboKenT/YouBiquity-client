import { useReducer, ReactNode, createContext } from "react";
interface AuthContextType {
  user: any;
  logged: boolean;
  error: any;
  fetch: any;
  loading?: boolean;
  messageLogged?: boolean;
  role?: string;
  xml?: string;
  dispatch: React.Dispatch<IReducer>;
}
interface mystate {
  loggedIn: boolean;
  user: any;
  error: any;
  fetch: any;
  loading?: boolean;
  messageLogged?: boolean;

  xml?: string;

  role?: string;
}

const initialState: mystate = {
  loggedIn: false,
  user: null,
  error: null,
  fetch: false,
  loading: false,
  messageLogged: false,
};
interface IReducer {
  type: string;
  payload: Partial<User>;
}

export interface User {
  username: string | undefined;
  password: string | undefined;
  error?: string;
  messageLogged?: boolean;
  role?: string;
  xml?: string;
}

export interface LoginResponse extends User {
  error?: string;
}

const authReducer = (state: mystate, action: IReducer) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "SIGNIN":
      console.log(action.payload.username);
      return {
        ...state,
        error: undefined,
        role: action.payload.role,
        loggedIn: true,
        messageLogged: true,
        user: action.payload.username,
        xml: action.payload.xml,
      };
    case "SIGNOUT":
      return {
        ...state,
        role: undefined,
        loggedIn: false,
        error: undefined,
        user: null,
      };
    case "ERROR":
      console.log(action.payload.error);
      return {
        ...state,
        error: action.payload.error,
      };
    case "REMOVERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "ADDLOGGED":
      return {
        ...state,
        logged: action.payload.messageLogged,
      };
    case "REMOVELOGGED":
      return {
        ...state,
        messageLogged: action.payload.messageLogged,
      };
    default:
      return state;
  }
};

export let AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  let value = {
    ...authState,
    user: authState.user,
    error: authState.error,
    logged: authState.loggedIn,

    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
