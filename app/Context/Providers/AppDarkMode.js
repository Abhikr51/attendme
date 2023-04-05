import React from 'react';
import { createContext } from 'react';
import useAppDarkMode from '../hooks/useAppDarkMode';
export const AppDarkModeContext = createContext()
const AppDarkMode = ({children,...rest}) => {
  const {initContext} = useAppDarkMode();
  return (
    <AppDarkModeContext.Provider value={initContext} >
      {children}
    </AppDarkModeContext.Provider>
  );
};

export default AppDarkMode;