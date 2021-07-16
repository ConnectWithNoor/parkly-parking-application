import React, { useState, useEffect, createContext } from 'react';

import { auth } from '../firebase/firebase';
import { getUserDataByUid } from '../firebase/firebaseDb';

import { successNotification } from '../utils/functions/notificationToasts';

const AppContext = createContext();

function AppProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [parkingDetails, setParkingDetails] = useState(null);

  useEffect(() => {
    const authSubscribe = () => {
      return auth.onAuthStateChanged(async (user) => {
        if (user) {
          if (userDetails) return;
          const { success, userInfo } = await getUserDataByUid(user.uid);

          if (success) {
            successNotification({
              title: 'Success',
              description: 'Redirecting to dashboard',
              duration: 1,
            });

            setTimeout(() => {
              setUserDetails(userInfo);
            }, 1200);
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
