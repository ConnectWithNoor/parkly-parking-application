import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function RedirectPage() {
  const [userLogged] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserDetails = async () => {
      if (userLogged === true) {
        setUserRole('root');
      }
    };

    checkUserDetails();
  }, [userLogged]);

  return userLogged ? (
    userRole === 'root' ? (
      <Redirect to='/view-students' />
    ) : (
      <Redirect to='/parking-section' />
    )
  ) : (
    <Redirect to='/login' />
  );
}

export default RedirectPage;
