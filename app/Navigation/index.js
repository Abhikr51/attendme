import React, { useEffect } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen from '../components/Screen';
import { useColorScheme } from 'react-native';
import AppColors from '../configs/AppColors';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Auth/Login';
import AppText from '../components/AppText';
import { useDispatch, useSelector } from 'react-redux';
import NoInternet from '../Screens/NoInternet';
import ShowNotConnected from '../components/ShowNoConnection';
import Register from '../Screens/Auth/Register';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import About from '../Screens/About';



const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
    background: AppColors.appBackgroundLight,
    text: AppColors.black,
    border: AppColors.grey,
  },
}
const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: AppColors.primary,
    background: AppColors.appBackgroundDark,
    card: AppColors.black
  },
}
const MainNavigator = createStackNavigator();
const Main = () => {
  return (
    <MainNavigator.Navigator screenOptions={{headerShown : false}} >
      <MainNavigator.Screen name='SplashScreen' component={SplashScreen} />
      <MainNavigator.Screen name='App' component={App} />
      <MainNavigator.Screen name='NoInternet' component={NoInternet} />
    </MainNavigator.Navigator>
  );
}
const UserNavigator = createStackNavigator()
const GuestNavigator = createStackNavigator()

const App = ({ navigation }) => {
  const dispatch = useDispatch()
  const auth = useSelector(s => s.auth)
  
  if (auth.loggedIn) {
    
    return (<>
      <ShowNotConnected />
      <UserNavigator.Navigator screenOptions={{ headerShown: false }} >
        <UserNavigator.Screen name='Home' component={Home} />
        <UserNavigator.Screen name='Profile' component={Profile} />
        <UserNavigator.Screen name='About' component={About} />

      </UserNavigator.Navigator>
    </>);
  }
  return (<>
    <ShowNotConnected />
    <GuestNavigator.Navigator>
      <GuestNavigator.Screen options={{ headerShown: false }} name='Login' component={Login} />
      <GuestNavigator.Screen options={{ headerShown: false }} name='Register' component={Register} />
    </GuestNavigator.Navigator>
  </>);
}

const Navigation = () => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer theme={colorScheme == 'dark' ? AppDarkTheme : AppLightTheme} >
      {/* <TestDrawer/> */}
      <Main />
    </NavigationContainer>
  );
}
export default Navigation;