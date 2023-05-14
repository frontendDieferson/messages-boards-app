import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useRouter } from 'next/router';
import { login, logout } from './api';
import { verifyToken } from '@/api/auth';

type AuthContextProps = {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

// export const AuthContext = createContext<AuthContextProps>({
//   user: null,
//   isAuthenticated: false,
//   loading: true,
//   login: () => {},
//   logout: () => {},
// });

export const AuthProvider: FC = ({ children }: {}) => {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyToken = async (token: string) => {
    return true
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
       const token = localStorage.getItem('token')
       if(token) {
        const isAuthenticated = await verifyToken(token);
        const userData = isAuthenticated ? null : null;
        setUser(userData);
      } else {
        setUser(null);
      }
       setLoading(false)
    } catch (error) {
      console.error('Erro ao verificar autenticação', error)
    }
  }

    checkAuthentication();
  }, []);

  const login = async (token: string) => {
    try {
      localStorage.setItem('token', token);
      const isAuthenticated = await verifyToken(token);
      const userData = isAuthenticated ?  null : null;
      setUser(userData);
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const authContextValue: AuthContextProps = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };



  // return (
    // <AuthContext.Provider value={authContextValue}>
    //   {children}
    // </AuthContext.Provider>
  // );

}
