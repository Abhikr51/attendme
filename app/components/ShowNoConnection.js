import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import AppColors from '../configs/AppColors';
import NetInfo from "@react-native-community/netinfo";
import AppText from './AppText';
let isFirst = true
const ShowNotConnected = () => {
    const [conn, setConn] = useState(true)
    const [delay, setDelay] = useState(false)
    useEffect(() => {
        var timeout;
        const unsubscribe = NetInfo.addEventListener(state => {
            if(!state.isConnected){
                isFirst = false
            }
            if(!isFirst ){
                setConn(state.isConnected)
                setDelay(true)
                timeout = setTimeout(()=>{
                    setDelay(!state.isConnected)
                },2000)
            }
        });

        return () => {
            // Unsubscribe
            clearTimeout(timeout);
            unsubscribe();
        };
    }, [])
    if (!delay) {
        return <></>
    }
    return (
        <AppText style={{
            backgroundColor: conn ?AppColors.success : AppColors.danger,
            color: AppColors.white,
            textAlign: "center",
            position: 'absolute',
            top: 0,
            width: Dimensions.get('screen').width,
            zIndex: 10000,
            padding: 3,
            paddingTop: StatusBar.currentHeight,
        }} >
            {
                conn ?"Connection restored" : "No internet connection"
            }
            
        </AppText>
    );
};

export default ShowNotConnected;
const styles = StyleSheet.create({

});