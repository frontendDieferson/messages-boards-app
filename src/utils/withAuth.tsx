/* eslint-disable react/display-name */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './auth';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const { isAuthenticated, loading, login } = useAuth();
    const router = useRouter();

    const ProtectedPage: React.FC = () => {
      // Seu componente protegido
      return <div>Conteúdo protegido</div>;
    };

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

export default withAuth(ProtectedPage);