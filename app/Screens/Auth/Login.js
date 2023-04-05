import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import AppText from '../../components/AppText'
import Screen from '../../components/Screen'
import { baseURL, loginURL } from '../../configs/AppData'
import { showToast } from '../../helpers/__globals_funcs'
import { useDispatch } from 'react-redux';
import Api from '../../helpers/Api'
import axios from 'axios'
import { Avatar, Button, Divider, Input, Layout, Text, Icon } from '@ui-kitten/components'
import AppColors from '../../configs/AppColors'
import Spacer from '../../components/Spacer'
import AppLayout from '../../components/AppLayout'
// import  Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const pulseIconRef = React.useRef();
    const [spinner, setSpinner] = useState(false);
    const dispatch = useDispatch()

    React.useEffect(() => {
        pulseIconRef.current.startAnimation();
    }, []);
    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={() => { setSecureTextEntry(!secureTextEntry); console.log(props) }}>
            <Icon {...props} size={20} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );
    const isValid = () => {
        var err = true
        if (email == '') {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
        if (password == '') {
            setPasswordErr(true)
        } else {
            setPasswordErr(false)
        }
        if (
            emailErr &&
            passwordErr
        ) {
            err = true
        } else {
            err = false
        }
        return !err
    }
    const loginUser = async () => {
        if (isValid()) {
            try {
                setSpinner(true);
                showToast("Please Wait ...")
                await Api.post(baseURL + loginURL, { email, password }).then(res => {
                    if (res.data.status) {
                        showToast(res.data.message);

                        setSpinner(false);

                    } else {
                        showToast(res.data.message);
                        setSpinner(false);

                    }
                }).catch(err => {
                    setSpinner(false);
                    console.log(err);
                    showToast("Opps, Faild to login!");
                })
            } catch (err) {
                setSpinner(false);
                console.log(err);
                showToast("Somthing went wrong!");

            }


        }
    }
    return (
        <Screen headerTranslucent={false} style={{ flex: 1, padding: 15, alignItems: 'center' }}
        // barStyle={'light-content'} 
        >
            {/* <View >

            </View> */}
            {/* <Image style={{ height: 100, width: 100 }} source={require('../../assets/images/attendance-icon.png')} /> */}
            <Icon name='person-done-outline' style={{ height: 120, width: 120, tintColor: AppColors.primary, marginTop: 40 }} />
            <Text category='h1' style={{ color: AppColors.primary, paddingBottom: 30, textAlign: 'center' }} >Attend Me</Text>
            <AppLayout style={{ width: '100%', position: 'absolute', bottom: 20 ,paddingBottom : 10 }} >
                <Text category='h3' >Sign In</Text>
                <Text category='label' style={{ marginVertical: 10 }} >Email</Text>
                <Input
                    // style={styles.input}

                    placeholder='eg : mymail@mail.com'
                // {...primaryInputState}
                />
                <Text category='label' style={{ marginVertical: 10 }} >Password</Text>
                <Input
                    // style={styles.input}

                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    placeholder='**************'
                // {...primaryInputState}
                />
                <Spacer size={15} />
                <Button status='primary'  >Proceed securely</Button>
                
                <Spacer size={15} />
                <TouchableOpacity onPress={() => navigation.navigate("Register")} >
                    <Text style={{ textAlign: 'center' }} >Don't have an account?{'\t'}<Text style={{ fontWeight: 'bold' }} status='primary'  >Register now</Text></Text>
                </TouchableOpacity>
                <Spacer size={15} />
                <Divider />
                <Button
                    status='basic'
                    appearance='ghost'
                    accessoryRight={(props) => <Icon ref={pulseIconRef} animationConfig={{ cycles: Infinity }} {...props} name={'heart'} style={{ width: 20, height: 20 }} fill={AppColors.danger} animation='pulse' />}
                >
                    Developed by It'z Abhi
                </Button>
            </AppLayout>
        </Screen>
    )
}
const styles = StyleSheet.create({

})
export default Login