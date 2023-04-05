
import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';

const DemoScreen2 = ({navigation}) => {


  
  return (
    <Screen style={styles.screen} >
      <AppText style={{marginVertical : 30}}  > DemoScreen 2</AppText>
      <Button title='Go to screen 1' onPress={()=>navigation.goBack()} />
    </Screen>
  );
};

export default DemoScreen2;
const styles = StyleSheet.create({
    screen : {
        justifyContent : 'center',
        alignItems : 'center'
      }
});