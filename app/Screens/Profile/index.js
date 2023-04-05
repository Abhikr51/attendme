import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import AppHeader from '../../components/AppHeader'
import { Avatar, Divider, List, ListItem, Text } from '@ui-kitten/components'
import AppLayout from '../../components/AppLayout'
import Spacer from '../../components/Spacer'

const Profile = () => {
  const personalDetails = [
    {
      title: "Phone",
      value: "1234567890"
    },
    {
      title: "Birth day",
      value: "8th May 2000"
    },
    {
      title: "Gaurdian name",
      value: "Mr. Parent "
    },
    {
      title: "Gender",
      value: "Male"
    },
    {
      title: "Address",
      value: "Garikhana Barakar road , Purulia , 723101, W.B"
    },
  ]
  const educationDetails = [
    {
      title: "Semester",
      value: "Semester I"
    },
    {
      title: "Course",
      value: "Masters of Computer Aplication"
    },

  ]
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.title}
      description={item.value}
    />
  );
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
              <Text category='h5' >Abhijit Kumar</Text>
              <Text appearance='hint' >abhijit.kumar.dev@gmail.com</Text>
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