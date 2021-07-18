import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SuspenseLoader from '../components/Suspense/SuspenseLoader';

import { AppContext } from '../context/AppContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { userDetails } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userDetails ? (
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
