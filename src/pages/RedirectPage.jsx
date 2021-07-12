import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

import { auth } from '../firebase/firebase';
import { getUserDataByUid } from '../firebase/firebaseDb';

function RedirectPage() {
  const { userDetails, setUserDetails } = useContext(AppContext);

  useEffect(() => {
    const authSubscribe = () => {
      return auth.onAuthStateChanged(async (user) => {
        if (user) {
          const { success, userInfo } = await getUserDataByUid(user.uid);
          if (success) {
            setUserDetails(userInfo);
          }
        } else {
          console.log({ success: false });
        }
      });
    };
    const unsubscribe = authSubscribe();

    return () => unsubscribe();
  }, []);

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
