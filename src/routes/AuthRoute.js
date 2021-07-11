import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SuspenseLoader from '../components/Suspense/SuspenseLoader';

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuth = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <SuspenseLoader>
            <Component {...props} />
          </SuspenseLoader>
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default AuthRoute;
