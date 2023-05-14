import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface ProtectedPageProps extends RouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({
  component: Component,
  isAuthenticated,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath} />
        )
      }
    />
  );
};

export default ProtectedPage;
