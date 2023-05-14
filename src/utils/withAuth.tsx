/* eslint-disable react/display-name */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './auth';
import ProtectedPage from '@/components/ProtectedPage';
//import { ProtectedPage } from '../components/ProtectedPage'

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const { isAuthenticated, loading, login } = useAuth();
    const router = useRouter();

    // const ProtectedPage: React.FC = () => {
    //   // Seu componente protegido
    //   return <div>Conteúdo protegido</div>;
    // };

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

// export default withAuth(ProtectedPage);

// import React, { ComponentType, useEffect } from 'react';
// //import { Redirect } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function withAuth<P extends JSX.IntrinsicAttributes>(Component: ComponentType<P>, redirectPath: string): React.FC<P> {
//   // eslint-disable-next-line react/display-name
//   return (props: P) => {
//     const { isAuthenticated, loading } = useAuth();

//     useEffect(() => {
//       // Perform any additional authentication logic if needed
//     }, []);

//     if (loading) {
//       // You can render a loading indicator here if desired
//       return <div>Loading...</div>;
//     }

//     if (!isAuthenticated) {
//       // Redirect the user to the specified path if not authenticated
//      // return <Redirect to={redirectPath} />;
//     }

//     // Render the wrapped component with the props
//     return <Component {...props} />;
//   };
// }

// export default withAuth;
