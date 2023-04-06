import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppColors from '../configs/AppColors'
import { Text } from '@ui-kitten/components'

const Required = () => {
  return (
      <Text style={{color : AppColors.danger}} >*</Text>
  )
}

export default Required

const styles = StyleSheet.create({})