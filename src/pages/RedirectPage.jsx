import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

import { auth } from '../firebase/firebase';
import { getUserDataByUid } from '../firebase/firebaseDb';

import { successNotification } from '../utils/notificationToasts';

function RedirectPage() {
  const { userDetails, setUserDetails } = useContext(AppContext);

  useEffect(() => {
    const authSubscribe = () => {
      return auth.onAuthStateChanged(async (user) => {
        if (user) {
          const { success, userInfo } = await getUserDataByUid(user.uid);

          if (success) {
            successNotification({
              title: 'Success',
              description: 'User successfully Logged. Redirecting to dashboard',
            });

            setTimeout(() => {
              setUserDetails(userInfo);
            }, 2000);
          }
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
