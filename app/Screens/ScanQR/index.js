'use strict';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity ,Linking,Pressable} from 'react-native';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AppColors from '../../configs/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons'
const ScanQR = ({navigation}) => {
  const [scannedText, setScannedText] = useState("")
  const [flashEnabled , setFlashEnabled] = useState(false)
  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    setScannedText(e.data)
    console.log(e.data);
  };
  return (
    <Screen headerTranslucent={false} style={styles.screen} >
      <TouchableOpacity onPress={()=>setFlashEnabled(!flashEnabled)} style={styles.flashBtn} >
        <Ionicons name={flashEnabled ?'flash-off':'flash'} size={20} color={AppColors.black} />
      </TouchableOpacity>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={flashEnabled? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        
        topContent={
          <Pressable disabled={!scannedText} onPress={()=>{
            Linking.openURL(scannedText).catch(err=>console.error(err))
          }} style={{paddingBottom: 30,}} >
            <AppText style={styles.centerText}>
              Scanned text
            </AppText>
            <AppText style={styles.textBold}>{scannedText ?? "----"}</AppText>
          </Pressable>
        }
        bottomContent={
          <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.buttonTouchable}>
            <AppText style={styles.buttonText}>OK. Got it!</AppText>
          </TouchableOpacity>
        }
        cameraStyle={styles.cameraContainer}
      />
    </Screen>
  );
};

export default ScanQR;
const styles = StyleSheet.create({
  screen: {
    // padding : 10,
  },
  centerText: {
    // flex: 1,
    fontSize: 18,
    color: AppColors.black,
    textAlign :'center'
  },
  flashBtn : {
    position : 'absolute',
    top : 30,
    right : 20,
  },
  textBold: {
    fontWeight: '500',
    color: AppColors.primary,
    textAlign : 'center'
  },
  cameraContainer : {
    height : 400,
    width : 300,
    borderRadius : 10,
    overflow : 'hidden',
    margin : 10,
    alignSelf : 'center',
    backgroundColor : 'red'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});