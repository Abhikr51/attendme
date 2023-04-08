import React, { useState } from 'react';
import { StyleSheet, View ,Dimensions ,ActivityIndicator ,Image} from 'react-native';
import AppText from "../components/AppText"
import Screen from '../components/Screen';
import Feather from "react-native-vector-icons/Feather"
import AppColors from '../configs/AppColors';
import NetInfo from "@react-native-community/netinfo";
import { showToast } from '../helpers/__globals_funcs';
import { StackActions } from '@react-navigation/native';
import LocalKeyStore from '../storage/AsyncStorage';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/actions/AuthActions';
import { Button, Text ,useTheme } from '@ui-kitten/components';

const NoInternet = ({navigation,route}) => {
  const [progress ,setProgress]=useState(false);
  const dispatch = useDispatch()
  const theme = useTheme()
  const nextScreen = async () => {
    var loginToken = null
    await LocalKeyStore.getKey('token', (err, token) => {
      if (token) {
        try {
          loginToken = token
        } catch (err) {
          loginToken = null;
          console.log(err);
        }
      }
    })
    if (loginToken !== null) {
      try{
        await dispatch(getUser(loginToken))
        
      }catch(err){
        console.log(err);
      }
    }
    console.log("Tasks are Completed");
  }
  const fetchInternet =async()=>{
    setProgress(true)
    await NetInfo.fetch().then(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        nextScreen().then(() => {
          setProgress(false)
          navigation.dispatch(
            StackActions.replace('App')
          );
        })
      }else{
        showToast("No connection found")
        setProgress(false)
      }
    }).catch(err=>{
      setProgress(false)
      showToast(err.message)
    });
  }
  return (
    <Screen style={{
        // justifyContent : 'center',
        alignItems : "center"
    }} >
      <Text style={styles.text} > <Feather name='wifi-off' size={20} color={theme['color-primary-500']} />{'\t'} No Internet </Text>
      <Image source={require("../assets/images/signal.png")} style={styles.image} resizeMode="contain" />
      
      {(progress) ?
        <ActivityIndicator style={{position : 'absolute', bottom : 30}} size='large'  color={theme['color-primary-500']} /> 
        : 
        <Button  onPress={()=>fetchInternet()} style={styles.btn} > { "Retry" } </Button>
      }
    </Screen>
  );
};

export default NoInternet;
const styles = StyleSheet.create({
    text :{
        fontSize : 20,
        fontWeight : "bold",
        marginVertical : 80 ,
    },
    image : {
        // height : "100%",
        width : (Dimensions.get('screen').width * 0.7),
        // position : 'absolute',
        // bottom : 0
        
    },
    btn : {
      position : "absolute",
      bottom : 20,
      width : 100
    }
});