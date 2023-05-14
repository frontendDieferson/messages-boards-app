import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { apiRequest, setAuthToken } from "./api";
import { AuthData, User } from "../types";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async () => {
    try {
      // Fazer a chamada para a API para obter os dados de autenticação
      const authData: AuthData = await apiRequest("/auth/login", "POST");
      const { user, token } = authData;

      // Armazenar os dados de autenticação no local storage ou cookie
      localStorage.setItem("token", token);
      setAuthToken(token);

      // Atualizar o estado do usuário e autenticação
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    // Remover o token do local storage ou cookie
    localStorage.removeItem("token");
    setAuthToken(null);

    // Redirecionar para a página de login
    router.push("/login");

    // Limpar o estado do usuário e autenticação
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setAuthToken(token);

        try {
          // Fazer a chamada para a API para verificar a autenticação
          const userData: User = await apiRequest("/auth/me", "GET");
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erro ao verificar autenticação:", error);
          logout();
        }
      } else {
        // Se não houver token, usuário não está autenticado
        setIsAuthenticated(false);
      }

      // Carregamento concluído
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
