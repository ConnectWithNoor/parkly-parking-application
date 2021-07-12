import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

function RedirectPage() {
  const { userDetails } = useContext(AppContext);

  return userDetails ? (
    userDetails.role === 'root' ? (
      <Redirect to='/view-students' />
    ) : (
      <Redirect to='/parking-section' />
    )
  ) : (
    <Redirect to='/login' />
  );
}

export default RedirectPage;
