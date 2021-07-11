import React, { useState, createContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  return (
    <AppContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
