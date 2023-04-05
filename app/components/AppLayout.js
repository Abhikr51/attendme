import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Layout } from '@ui-kitten/components'

const AppLayout = ({children , style , level ='1' }) => {
  return (
    <Layout level={level} style={[{ padding : 20 ,borderRadius  :10},style]}>
        {children}
    </Layout>
  )
}

export default AppLayout

const styles = StyleSheet.create({})