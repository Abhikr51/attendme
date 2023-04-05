import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from './AppText';

const AppBadge = ({color,children,style,textStyle,numberOfLines,...rest}) => {
    return (
        <View style={[{ flexDirection: 'row' },style]} {...rest}>
            <AppText numberOfLines={numberOfLines} style={[{ textAlign : 'center',backgroundColor: color+ '34', borderRadius: 20, color: color, marginTop: 5, fontSize: 10, padding: 2, paddingHorizontal: 10 },textStyle]} >{children}</AppText>
        </View>
    );
};

export default AppBadge;
