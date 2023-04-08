import { StatusBar, StyleSheet, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Screen from '../../components/Screen'
import { Avatar, Icon, MenuItem, OverflowMenu, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AppColors from '../../configs/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../store/actions/AuthActions';
import { socket } from '../../configs/socket';
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
  const [completed, setCompleted] = useState(true)
  const [spinner, setSpinner] = useState(false)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [qrText, setQrText] = useState("");
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
    console.log(e.data);
  };
  const showRecorded = () => {
    setCompleted(true)
    return setTimeout(() => {
      setCompleted(false)
    }, 3000)
  }
  useEffect(() => {
    onConnect()
    // socket.emit('test',{message : "Hello from"})
    socket.on('getQrText',(qrText)=>{
        console.log(qrText);
        setQrText(qrText)
    })
    const tout = showRecorded()
    return () => {
        onDisconnect()
        clearTimeout(tout)
      };
}, [])
  return (
    <Screen >
      <TopNavigation
        style={styles.top_nav}
        title={renderTitle}
        accessoryRight={renderRightActions}
      />
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}

        topContent={
          <Pressable disabled={!scannedText} onPress={() => {
            // Linking.openURL(scannedText).catch(err=>console.error(err))
          }}  >
            <Text category='h4' style={styles.centerText}>
              {completed ? "Attendance Recorded" : "Searching for QR code ..."}
            </Text>
            <Text style={styles.textBold}> {
              completed ?
                <Icon
                  style={{ width: 40, height: 40 }}
                  fill={AppColors.success}
                  name='checkmark-circle-2'
                /> :
                <Spinner />
            }
            </Text>
          </Pressable>
        }
        bottomContent={
          <TouchableOpacity onPress={()=>{}} style={styles.buttonTouchable}>
            <Text status={isConnected ? 'success' : 'danger'}> {isConnected ? "Connected" : "Disconnected"} </Text>
          </TouchableOpacity>
        }
        cameraStyle={styles.cameraContainer}
      />
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
    textAlign: 'center'
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