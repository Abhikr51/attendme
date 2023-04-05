import { StyleSheet, StatusBar, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

const AppHeader = ({children,...rest}) => {
    const navigation = useNavigation()
    const BackIcon = (props) => (
        <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Icon {...props} name='arrow-back'/>
        </TouchableOpacity>
      );
    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon}/>
      );
    return (
        <>
            <TopNavigation
                style={{paddingTop  :StatusBar.currentHeight + 10,paddingBottom : 20 }}
                {...rest}
                title={children}    
                accessoryLeft={renderBackAction}
            />
            <Divider />
        </>
    )
}

export default AppHeader

const styles = StyleSheet.create({})