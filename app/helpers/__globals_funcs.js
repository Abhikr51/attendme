import {ToastAndroid} from 'react-native'

export const showToast = (msg)=>{
    ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
}