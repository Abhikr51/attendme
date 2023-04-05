import { Alert, ToastAndroid } from "react-native"
import { getUserURL, logoutURL, otpURL, baseURL, user_updateURL } from "../../configs/AppData"
import LocalKeyStore from "../../storage/AsyncStorage"
import splashEvents from "../../helpers/splashEvents"
import { showToast } from "../../helpers/__globals_funcs"
import Api from "../../helpers/Api"
import DeviceInfo from 'react-native-device-info'




export const SET_PANEL = "SET_PANEL"
export const UPDATE_USER = "UPDATE_USER"
export const SET_LOGIN = "SET_LOGIN"
export const SET_LOGOUT = "SET_LOGOUT"

export const setAuthPanel = (p) => {
    return (dispatch) => {
        dispatch({
            type: SET_PANEL,
            payload: p
        })
    }
}
export const updateUser = (values) => {
    return async (dispatch) => {
        var FData = new FormData();
        if (values.image) {
            FData.append('image', {
                uri: Platform.OS === 'android' ? values.image.uri : values.image.uri.replace('file://', ''),
                // uri: values.image.uri, 
                name: values.image.name,
                type: 'image/jpeg',
            });
        }
        if (values.email) {
            FData.append('email', values.email);
        }
        if (values.phone) {
            FData.append('phone', values.phone);
        }
        if (values.name) {
            FData.append('name', values.name);
        }
        if (values.dob) {
            FData.append('dob', values.dob);
        }
        if (values.gender) {
            FData.append('gender', values.gender);
        }

        await fetch(baseURL + user_updateURL, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + Api.defaults.token,
            },
            body: FData
        })
            .then(response => response.json())
            .then(resData => {
                if (resData.status) {
                    dispatch({
                        type: UPDATE_USER,
                        payload: resData.data
                    })
                } else {
                    alert(resData.errors.email)
                    throw new Error(resData.errors.email);
                }
            }).catch(err => {
                console.log(err)
                throw new Error(err.message);
            })

    }
}
export const setLogin = (code, user_id) => {


    return async (dispatch) => {
        // your code for login
        console.log("userId is ", user_id);
        await Api.post(baseURL + otpURL, {
            code: code,
            user_id: user_id
        },
            {
                headers: {
                    'device-id': DeviceInfo.getDeviceId(),
                    'device-type': DeviceInfo.getDeviceType(),
                }
            }
        ).then(res => {
            if (res.data.status) {
                dispatch({
                    type: SET_LOGIN,
                    user: res.data.data.user,
                    token: res.data.token
                })
                splashEvents(dispatch, res.data.token, res.data.data.user)
                LocalKeyStore.setKey('token', res.data.token)
                LocalKeyStore.setKey('authData', res.data.data.user)
            } else {
                showToast(res.data.message)
                throw new Error(res.data.message);
            }
        }).catch(err => {
            console.log("login Err", err);
            throw new Error(err.message);
        })

    }
}

export const getUser = (token) => {


    return async (dispatch) => {
        //your code for get User
        Api.defaults["token"] = token
        await Api.get(baseURL + getUserURL, {
            headers: {
                'device-id': DeviceInfo.getDeviceId(),
                'device-type': DeviceInfo.getDeviceType(),
            }
        }).then(res => {
            if (res.data.status) {
                dispatch({
                    type: SET_LOGIN,
                    user: res.data.data,
                    token: token
                })
                splashEvents(dispatch, token, res.data.data)
                LocalKeyStore.setKey('token', token)
                LocalKeyStore.setKey('authData', res.data.data)
                // ToastAndroid.showWithGravity(
                //     res.data.message,
                //     ToastAndroid.SHORT,
                //     ToastAndroid.CENTER
                // );
            } else {
                // ToastAndroid.showWithGravity(
                //     "Network error",
                //     ToastAndroid.SHORT,
                //     ToastAndroid.CENTER
                // );
                throw new Error(res.data.message);

            }
        }).catch(err => {
            if (err.response.status == 401) {
                ToastAndroid.showWithGravity(
                    err.response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                // console.log("ERR" ,err.response);
                LocalKeyStore.removeKey('token')
                LocalKeyStore.removeKey('authData')
            }
            console.log("Status", err.response.status);
            throw new Error(err.message);
        })
    }
}

export const setLogout = () => {


    return async (dispatch, getState) => {
        // your code for logout
        // const token = getState().auth.token
        // Api.defaults.headers.common["Authorization"] = "Bearer " + token
        Alert.alert(
            "Logout",
            "Are you sure want to logout ? ",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log('Cancelled') },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        // console.log("Token for logout",Api.defaults.token)
                        await Api.post(baseURL + logoutURL).then(res => {
                            // console.log("Logout",res);
                            if (res.data.status) {
                                dispatch({
                                    type: SET_LOGOUT,
                                })
                                LocalKeyStore.removeKey('token')
                                LocalKeyStore.removeKey('authData')
                            }
                            ToastAndroid.showWithGravity(
                                res.data.message,
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }).catch(err => {
                            console.log(err);
                            throw new Error(err.message);
                        })
                    }
                }
            ]
        );

    }
}