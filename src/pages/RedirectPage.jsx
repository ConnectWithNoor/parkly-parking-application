import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function RedirectPage() {
  const [userLogged] = useState(true);
  const [userRole, setUserRole] = useState('user');

  useEffect(() => {
    const checkUserDetails = async () => {
      if (userLogged === true) {
        setUserRole('root');
      }
    };

    checkUserDetails();
  }, []);

  return userLogged ? (
    userRole === 'root' ? (
      <Redirect to='/admin' />
    ) : (
      <Redirect to='/parking-section' />
    )
  ) : (
    <Redirect to='/login' />
  );
}

export default RedirectPage;
