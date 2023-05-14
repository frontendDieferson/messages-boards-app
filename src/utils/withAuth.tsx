import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './auth';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const { isAuthenticated, loading, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        login();
      }
    }, [isAuthenticated, loading, login]);

    if (loading) {
      // Pode exibir uma tela de carregamento enquanto verifica a autenticação
      return <p>Carregando...</p>;
    }

    if (!isAuthenticated) {
      // Redirecionar para a página de login
      router.push('/login');
      return null;
    }

    // Renderizar o componente passado como argumento com autenticação verificada
    return <WrappedComponent {...props} />;
  };
}
