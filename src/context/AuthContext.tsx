import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

/*
 * Session storage is an interim hardening step: tokens are still readable by
 * JavaScript (no httpOnly), but they no longer persist after the tab closes.
 * The durable fix is a backend that issues httpOnly, Secure, SameSite cookies.
 */
const storage = window.sessionStorage;

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = storage.getItem(TOKEN_KEY);
    const storedUser = storage.getItem(USER_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        storage.removeItem(USER_KEY);
      }
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    storage.setItem(TOKEN_KEY, newToken);
    storage.setItem(USER_KEY, JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    storage.removeItem(TOKEN_KEY);
    storage.removeItem(USER_KEY);

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(token),
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};