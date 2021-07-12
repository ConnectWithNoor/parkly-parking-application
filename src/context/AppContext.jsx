import React, { useState, useEffect, createContext } from 'react';

import { auth } from '../firebase/firebase';
import { getUserDataByUid } from '../firebase/firebaseDb';

import { successNotification } from '../utils/notificationToasts';

const AppContext = createContext();

function AppProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [parkingDetails, setParkingDetails] = useState(null);

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
            }, 600);
          }
        }
      });
    };
    const unsubscribe = authSubscribe();

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        parkingDetails,
        setParkingDetails,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
