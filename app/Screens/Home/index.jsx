import { StatusBar, StyleSheet, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Screen from '../../components/Screen'
import { Avatar, Button, Icon, MenuItem, OverflowMenu, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AppColors from '../../configs/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../store/actions/AuthActions';
import { socket } from '../../configs/socket';
import { showToast } from '../../helpers/__globals_funcs';
import Spacer from '../../components/Spacer';
const InfoIcon = (props) => (
  <Icon {...props} name='info' />
);
const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const Home = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scannedText, setScannedText] = useState("")
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(true)
  const [spinner, setSpinner] = useState(false)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [qrText, setQrText] = useState("");
  const [scanned, setScanned] = useState()
  let timeout;
  const qrRef = useRef(null)
  const auth = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const FlashIcon = (props) => (
    <TouchableOpacity onPress={() => setFlashEnabled(!flashEnabled)} style={styles.flashBtn} >
      <Icon {...props} name={flashEnabled ? 'flash-off' : 'flash'} color={AppColors.black} />
    </TouchableOpacity>
  );
  const on_logout = async () => {
    setSpinner(true);
    dispatch(setLogout(() => { toggleMenu() }, () => { setSpinner(false) }))
  }
  const LogoutIcon = (props) => (
    spinner ? <Spinner status='basic' size='small' style={{ paddingLeft: 10 }} />
      :
      <Icon {...props} name='log-out' />
  );
  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={FlashIcon} />
      <OverflowMenu
        anchor={() => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem onPress={() => { toggleMenu(); navigation.navigate('About') }} accessoryLeft={InfoIcon} title='About creator' />
        <MenuItem onPress={on_logout} accessoryLeft={LogoutIcon} title='Logout' />
      </OverflowMenu>
    </React.Fragment>
  );
  const renderTitle = (props) => (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require('../../assets/images/student.png')}
      />
      {
        Object.keys(auth.user).length !== 0 ?
          <Text {...props}>Hey , {auth.user.details.first_name}</Text>
          :
          <Spinner status='primary' />
      }
    </TouchableOpacity>
  );
  function onConnect() {
   socket.connect();
    setIsConnected(true);
  }

  function onDisconnect() {
    socket.disconnect();
    setIsConnected(false);
  }

  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    setScannedText(e.data)
    // console.log(e.data);
    let splitted = e.data.split('$')
    let client_data = {
      qr_text: splitted[0],
      qr_id: splitted[1],
      a_id: splitted[2],
      user_id: auth.user.details._id,
    }
    console.log(client_data);
    socket.emit('app:makeAttendance', client_data)
  };
  // const showSuccess = () => {
  //   setSuccess(true)
  //   return setTimeout(() => {
  //     setSuccess(false)
  //   }, 3000)
  // }
  const showError = () => {
    setError(true)
    return setTimeout(() => {
      setError(false)
    }, 3000)
  }
  useEffect(() => {
    onConnect()
    // socket.emit('test',{message : "Hello from"})
    socket.on('app:sendSuccess', (res) => {
      setSuccess(true)
      setScanned(true);
      console.log("test");
      showToast(res)
    })
    socket.on('app:sendErr', (res) => {
      setSuccess(false)
      setScanned(true);
      console.log("test");
      showToast(res.msg)
    })
    return () => {
      onDisconnect()
      clearTimeout(timeout)
    };
  }, [])
  const scan_again = () => {
    setScanned(false)
    setTimeout(() => {
      qrRef.current.reactivate()
    }, 500)
  }
  return (
    <Screen >
      <TopNavigation
        style={styles.top_nav}
        title={renderTitle}
        accessoryRight={renderRightActions}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >

        {
          scanned ?
            <>
              <Text category='h4' status={success ? 'success' : 'danger'} style={styles.centerText}>
                {success ? "Attendance Recorded" : "Could not record attendance"}
              </Text>
              <Text style={styles.textBold}>
                <Icon
                  style={{ width: 40, height: 40 }}
                  fill={success ? AppColors.success : AppColors.danger}
                  name={success ? 'checkmark-circle-2' : "close-circle-outline"}
                />
              </Text>
              <Spacer size={20} />
              <Button onPress={scan_again} status={success ? 'success' : 'danger'} appearance='outline' >Scan Again</Button>
            </>
            :
            <>

              <QRCodeScanner
                onRead={onSuccess}
                flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                ref={qrRef}
                topContent={
                  <Pressable disabled={!scannedText} onPress={() => {
                    // Linking.openURL(scannedText).catch(err=>console.error(err))
                  }}  >
                    <View style={{alignItems : 'center'}} >
                      <Text category='h4' style={styles.centerText}>
                        Searching for QR code ...
                      </Text>
                        <Spinner />
                    </View>
                  </Pressable>
                }
                bottomContent={
                  <TouchableOpacity onPress={() => { }} style={styles.buttonTouchable}>
                    <Text status={isConnected ? 'success' : 'danger'}> {isConnected ? "Connected" : "Disconnected"} </Text>
                  </TouchableOpacity>
                }
                cameraStyle={styles.cameraContainer}
              />
            </>
        }
      </View>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
  top_nav: {
    paddingTop: StatusBar.currentHeight + 10
  },
  centerText: {
    // flex: 1,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  flashBtn: {
    // position : 'absolute',
    // top : 30,
    // right : 20,
  },
  textBold: {
    fontWeight: '500',
    color: AppColors.primary,
    textAlign: 'center'
  },
  cameraContainer: {
    height: 400,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});