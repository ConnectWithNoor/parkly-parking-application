import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function RedirectPage() {
  const [userLogged] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserDetails = async () => {
      if (userLogged === true) {
        setUserRole('user');
      }
    };

    checkUserDetails();
  }, [userLogged]);

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
