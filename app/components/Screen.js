import React, { useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import useAppDarkMode from '../Context/hooks/useAppDarkMode';
import AppText from './AppText';
import AppColors from '../configs/AppColors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Layout } from '@ui-kitten/components';

const Screen = ({ children,
  style,
  headerTranslucent = true,
  statusBarColorLight = AppColors.appBackgroundLight,
  statusBarColorDark = AppColors.black,
  barStyle = null,
  level = "3",
  ...rest }) => {

  const { mode } = useAppDarkMode();
  const isDarkMode = mode === 'dark';
  const defaultBarStyle = mode === 'dark' ? 'light-content' : 'dark-content'
  
  return (
    <Layout level={level} style={[styles.screen, {
      backgroundColor: isDarkMode ? statusBarColorDark : statusBarColorLight,
      paddingTop: !headerTranslucent ? StatusBar.currentHeight : 0
    }]}>
      <StatusBar translucent backgroundColor='transparent' barStyle={barStyle ? barStyle : defaultBarStyle} />
      <View style={[{
        flex: 1,
        backgroundColor: isDarkMode ? AppColors.black : AppColors.appBackgroundLight,
      }, style]}>
        {children}
      </View>
    </Layout>
  );
};

export default Screen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textStyle: {
    fontSize: 20,
  }
});