import { StyleSheet, View ,TouchableOpacity ,TouchableWithoutFeedback ,ScrollView} from 'react-native'
import React, { useState } from 'react'
import Screen from '../../components/Screen'
import AppHeader from '../../components/AppHeader'
import { Button, Divider, Icon, IndexPath, Input, Text ,Select,SelectItem, Datepicker } from '@ui-kitten/components'
import Spacer from '../../components/Spacer'
import AppLayout from '../../components/AppLayout'
import AppColors from '../../configs/AppColors'

const Register = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [date, setDate] = React.useState(new Date('2000-01-01'));
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={()=>{setSecureTextEntry(!secureTextEntry);console.log(props)}}>
        
      <Icon {...props} size={20} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );
  return (
    <Screen >
      <AppHeader>Register</AppHeader>
      <ScrollView contentContainerStyle={{padding : 20}} >
        <AppLayout  >
          <Text category='label' style={{ marginVertical: 10 }} >First name</Text>
          <Input
            placeholder='Enter first_name'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Middle name</Text>
          <Input
            placeholder='(optional)'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Last name</Text>
          <Input
            placeholder='Enter last_name'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Course</Text>
          <Select
            selectedIndex={selectedIndex}
            placeholder={()=><Text appearance='hint' style={{paddingLeft : 10 }} >Choose course</Text>}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title='Option 1'/>
            <SelectItem title='Option 2'/>
            <SelectItem title='Option 3'/>
          </Select>
          <Text category='label' style={{ marginVertical: 10 }} >Semester</Text>
          <Select
            selectedIndex={selectedIndex}
            placeholder={()=><Text appearance='hint' style={{paddingLeft : 10 }} >Choose semester</Text>}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title='Option 1'/>
            <SelectItem title='Option 2'/>
            <SelectItem title='Option 3'/>
          </Select>
          <Text category='label' style={{ marginVertical: 10 }} >Date of birth</Text>
          <Datepicker
            date={date}
            onSelect={nextDate => setDate(nextDate)}
          />
          <Text category='label' style={{ marginVertical: 10 }} >Father name</Text>
          <Input
            placeholder='Enter ...'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Gaurdian name</Text>
          <Input
            placeholder='Enter ...'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Gender</Text>
          <Input
            placeholder='Enter ...'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Category</Text>
          <Input
            placeholder='Enter ...'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Email</Text>
          <Input
            placeholder='eg : mymail@mail.com'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Phone</Text>
          <Input
            placeholder='eg : 1234567890'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Address</Text>
          <Input
            placeholder='Enter your address'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Password</Text>
          <Input
            // style={styles.input}

            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder='**************'
          />
          <Text category='label' style={{ marginVertical: 10 }} >Confirm Password</Text>
          <Input
            // style={styles.input}

            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder='**************'
          />
          <Spacer size={15} />
          <Button status='primary'  >Register yourself</Button>
          <Spacer size={15} />
          <Divider />
          <Spacer size={15} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={{ textAlign: 'center' }} >Already have account?{'\t'}<Text style={{ fontWeight: 'bold' }} status='primary'  >Go to login</Text></Text>
          </TouchableOpacity>
        </AppLayout>
      </ScrollView>
    </Screen>
  )
}

export default Register

const styles = StyleSheet.create({})