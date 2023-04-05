import { StyleSheet, View ,Image, ScrollView} from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import AppHeader from '../../components/AppHeader'
import {  Text } from '@ui-kitten/components'
import Spacer from '../../components/Spacer'
import AppColors from '../../configs/AppColors'
import AppLayout from '../../components/AppLayout'

const About = () => {
  return (
    <Screen>
      <AppHeader>About creators</AppHeader>
      <ScrollView contentContainerStyle={{padding : 10}}>

        <AppLayout style={{alignItems  :'center'}} > 
            <View style={{width : 100, height : 100 , borderRadius : 50 }} >
                <Image resizeMode='cover' source={require('../../assets/images/user_avatar.png')} style={{height : "100%" , width  :"100%"}} />
            </View>
            <Spacer size={20} />
            <Text style={{fontSize : 25}}  >Abhijit Kumar</Text>
            <Text style={{fontSize : 12}} appearance="hint" >[ Itz Abhi ]</Text>
            <Text style={{fontSize : 15}} appearance="hint" >Web Developer | App Developer</Text>
            <Spacer size={20} />
            <View style={{flexDirection : 'row',justifyContent : 'space-around',width : "100%"}} >
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/facebook.png")} />
                </View>
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/gmail.png")} />
                </View>
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/github.png")} />
                </View>
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/linkedin.png")} />
                </View>
            </View>
        </AppLayout>
        <Spacer size={10} />
        <AppLayout style={{alignItems  :'center'}} > 
            <View style={{width : 100, height : 100 , borderRadius : 50 }} >
                <Image resizeMode='cover' source={require('../../assets/images/user_avatar.png')} style={{height : "100%" , width  :"100%"}} />
            </View>
            <Spacer size={20} />
            <Text style={{fontSize : 25}}  >Riman Mandal</Text>
            <Text style={{fontSize : 15}} appearance="hint" >Assistant Professor</Text>
            <Text style={{fontSize : 10}} appearance="hint" >University of Kalyani</Text>
            <Spacer size={20} />
            <View style={{flexDirection : 'row',justifyContent : 'space-around',width : "100%"}} >
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/facebook.png")} />
                </View>
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/gmail.png")} />
                </View>
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/web-link.png")} />
                </View>
                <View style={[styles.socialBtn]} >
                    <Image style={styles.img} source={require("../../assets/images/linkedin.png")} />
                </View>
            </View>
        </AppLayout>
      </ScrollView>
    </Screen>
  )
}

export default About

const styles = StyleSheet.create({
    socialBtn : {
        height : 50,
        width : 50,
        borderRadius : 5,
        borderColor : AppColors.lightGrey,
        borderWidth : 1,
        padding : 10
    },
    img:{height : "100%" , width  :"100%"}
})