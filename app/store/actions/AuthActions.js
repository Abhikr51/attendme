import { Alert, ToastAndroid } from "react-native"
import { getUserURL, logoutURL, otpURL, baseURL, user_updateURL, loginURL, registerURL } from "../../configs/AppData"
import LocalKeyStore from "../../storage/AsyncStorage"
import splashEvents from "../../helpers/splashEvents"
import { showToast } from "../../helpers/__globals_funcs"
import Api from "../../helpers/Api"
import DeviceInfo from 'react-native-device-info'
import axios from "axios"




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
export const setLogin = (email, password, next = () => { }, nextError = () => { }) => {


    return async (dispatch) => {
        await Api.post(baseURL + loginURL, { email, password }).then(({ data }) => {
            // console.log("setLogin" , data);
            if (data.status) {
                if (data.data.role == 'student') {
                    LocalKeyStore.setKey('token', data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                    splashEvents(dispatch, data.token, data.data)
                    dispatch({
                        type: SET_LOGIN,
                        user: data.data,
                        token: data.token
                    })
                } else {
                    throw new Error("Only students can access this APP !!")
                }
                next();
            } else {
                console.log(data);
                throw new Error(data.msg)
            }
        }).catch(err => {
            console.log("setLogin", err);
            nextError({ message: err.response ? err.response.data.msg : err.message })
        })


    }
}
export const registerUser = (values, next = () => { }, nextError = () => { }) => {


    return async (dispatch) => {
        let data = {
            first_name : values.first_name,
            middle_name : values.middle_name,
            last_name : values.last_name,
            dob : values.dob.toLocaleDateString().split('/').join('-'),
            gender : values.gender,
            email : values.email,
            phone : values.phone,
            father_name : values.father_name,
            guardian_name : values.guardian_name,
            course : values.course,
            semester : values.semester,
            category : values.category,
            address : values.address,
            password : values.password,
        }
        await Api.post(baseURL + registerURL, data).then(({ data }) => {
            if (data.status) {
                LocalKeyStore.setKey('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                splashEvents(dispatch, data.token, data.data)
                dispatch({
                    type: SET_LOGIN,
                    user: data.data,
                    token: data.token
                })
                next();
            } else {
                // console.log(data);
                throw new Error(data.msg)
            }
        }).catch(err => {
            console.log("setLogin", err);
            nextError({ message: err.response ? err.response.data.msg : err.message })
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

export const setLogout = (onNext = () => { }, onErr = () => { }) => {


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
                    onPress: () => { console.log('Cancelled'); onErr(); },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        // console.log("Token for logout",Api.defaults.token)
                        // await Api.post(baseURL + logoutURL).then(res => {
                        //     // console.log("Logout",res);
                        //     if (res.data.status) {
                        try {
                            onNext()
                            dispatch({
                                type: SET_LOGOUT,
                            })
                            LocalKeyStore.removeKey('token')
                            LocalKeyStore.removeKey('authData')
                        } catch (err) {
                            onErr();
                            console.log(err);
                            showToast(err.message);
                        }
                        // }
                        // ToastAndroid.showWithGravity(
                        //     res.data.message,
                        //     ToastAndroid.SHORT,
                        //     ToastAndroid.CENTER
                        // );
                        // }).catch(err => {
                        //     onErr();
                        //     console.log(err);
                        //     showToast(err.message);
                        // })
                    }
                }
            ]
        );

    }
}