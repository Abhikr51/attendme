import { StyleSheet,  useColorScheme, View } from 'react-native';
import React from 'react';
import useAppDarkMode from '../Context/hooks/useAppDarkMode';
import AppColors from '../configs/AppColors';
import { Text } from '@ui-kitten/components';

const AppText = ({disableDarkMode=false,numberOfLines,style,children, ...rest}) => {
    const {mode} = useAppDarkMode();
    const isDarkMode = disableDarkMode ? false : mode === 'dark'
    return (
    <Text style={[{color : isDarkMode ? AppColors.white : AppColors.black,},style]} numberOfLines={numberOfLines} {...rest} >{children}</Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
    
});
