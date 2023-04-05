/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  LogBox,useColorScheme
} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import AppText from './app/components/AppText';
import AppDarkMode from './app/Context/Providers/AppDarkMode';
import Navigation from './app/Navigation';
import store from './app/store';
import { default as theme } from "./app/assets/theme/custom_theme.json"
import { EvaIconsPack } from '@ui-kitten/eva-icons';
const App = () => {
  const systemColorScheme = useColorScheme();
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={systemColorScheme == 'light' ? {...eva.light,...theme} : eva.dark}>
      <Provider store={store} >
        <AppDarkMode>
          <Navigation />
          {/* <AppText>Hello</AppText> */}
        </AppDarkMode>
      </Provider>
    </ApplicationProvider>
    </>
  );
};

export default App;


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
