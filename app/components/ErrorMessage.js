import React from 'react'
import { Text } from '@ui-kitten/components'
import AppColors from '../configs/AppColors'

const ErrorMessage = ({error,touched}) => {
  return (touched && error) ? <Text style={{color : AppColors.danger, margin :5,fontSize:13}} >{error}</Text> : null
}

export default ErrorMessage