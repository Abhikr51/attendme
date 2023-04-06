import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import AppHeader from '../../components/AppHeader'
import { Avatar, Divider, List, ListItem, Text } from '@ui-kitten/components'
import AppLayout from '../../components/AppLayout'
import Spacer from '../../components/Spacer'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(s=>s.auth.user)
  const personalDetails = [
    {
      title: "Phone",
      value: user.details.phone
    },
    {
      title: "Birth day",
      value: user.details.dob
    },
    {
      title: "Gaurdian name",
      value: user.details.guardian_name
    },
    {
      title: "Gender",
      value: user.details.gender
    },
    {
      title: "Address",
      value: user.details.address
    },
  ]
  const educationDetails = [
    {
      title: "Semester",
      value: "Semester "+user.details.semester_code
    },
    {
      title: "Course",
      value: user.details.stream_code
    },

  ]
  return (
    <Screen>
      <AppHeader>Profile</AppHeader>
      <ScrollView contentContainerStyle={{ padding: 10 }} >
        <AppLayout>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Avatar
              size='giant'
              // style={styles.logo}
              source={require('../../assets/images/student.png')}
            />
            <View style={{ flex: 1, paddingLeft: 20 }}>
              <Text category='h5' >{user.details.name}</Text>
              <Text appearance='hint' >{user.email}</Text>
            </View>
          </View>
        </AppLayout>
        <Spacer size={10} />
        <AppLayout>
          <Text category="h6" >Personal Details</Text>

          {
            personalDetails.map((item, index) => (
              <ListItem
                key={index}
                title={item.title}
                description={item.value}
              />
            ))
          }
        </AppLayout>
        <Spacer size={10} />
        <AppLayout>
          <Text category="h6" >Education Details</Text>
          {
            educationDetails.map((item, index) => (
              <ListItem
                key={index}
                title={item.title}
                description={item.value}
              />
            ))
          }
        </AppLayout>
      </ScrollView>
    </Screen>
  )
}

export default Profile

const styles = StyleSheet.create({})