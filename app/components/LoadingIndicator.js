import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Spinner } from '@ui-kitten/components';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );
  

export default LoadingIndicator

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
      },
})