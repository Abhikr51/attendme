import { StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import AppColors from '../configs/AppColors';
import LocalKeyStore from '../storage/AsyncStorage';
import { getUser } from '../store/actions/AuthActions';
import NetInfo from "@react-native-community/netinfo";
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const nextScreen = async () => {
    var redirect = "App"
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
        // await locationRedirect(dispatch).then((re)=>{
        //   redirect = re
        //   console.log("re",re);
        // })
        await dispatch(getUser(loginToken))
      }catch(err){
        console.log(err);
      }
    }
    console.log("Tasks are Completed");
    return redirect
  }
  const fetchInternet =async()=>{
    var conn = false
    console.log("Fetching...");
    await NetInfo.fetch().then(state => {
      // console.log("Connection type", state.type);
      conn =  state.isConnected
    });
    return conn
  }
  useEffect(()=>{
    fetchInternet().then(isConnected=>{
      if (isConnected) {
        nextScreen().then((redirect) => {
          navigation.dispatch(
            StackActions.replace(redirect)
          );
        })
      }else{
        navigation.dispatch(
          StackActions.replace('NoInternet')
        );
      }
    })
    // const splashTimeout = setTimeout(()=>{
    // },2000)
    // return ()=>{
    //   clearTimeout(splashTimeout);
    // }
  },[])
  return (
    <Screen style={{alignItems : 'center',justifyContent : 'center'}} >
      <AppText style={{fontSize:40, textAlign : 'center'}} >Attend</AppText>
      <AppText style={{fontSize:70, textAlign : 'center' , color : AppColors.primary}}>Me</AppText>
      <ActivityIndicator size='large' style={{position : 'absolute', width  :40,height : 40 , bottom : 100}} color={AppColors.primary} />
    </Screen>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({

});