import { useColorScheme, View } from 'react-native';
import React, { useState } from 'react';

const useAppDarkMode = () => {
  const systemColorScheme = useColorScheme();
  const [scheme , setScheme] = useState('system-default' );  // 'system-default' | 'light'  | 'dark'
  const mode = scheme == 'system-default' ? systemColorScheme : scheme
  const initContext = {
    colorScheme : scheme,
    mode,
    setColorScheme : s => setScheme(s) ,
  }
  return {initContext,mode,colorScheme : scheme,setColorScheme : s => setScheme(s) ,}
};

export default useAppDarkMode;