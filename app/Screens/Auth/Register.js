import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import AppHeader from '../../components/AppHeader'
import { Button, Divider, Icon, IndexPath, Input, Text, Select, SelectItem, Datepicker, Radio, RadioGroup } from '@ui-kitten/components'
import Spacer from '../../components/Spacer'
import AppLayout from '../../components/AppLayout'
import AppColors from '../../configs/AppColors'
import Required from '../../components/Required'
import { Formik } from 'formik'
import * as Yup from 'yup';
import ErrorMessage from '../../components/ErrorMessage'
import AppPicker from '../../components/AppPicker'
import { baseURL, semester_listURL, stream_listURL } from '../../configs/AppData'
import Api from '../../helpers/Api'
import LoadingIndicator from '../../components/LoadingIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/actions/AuthActions'
import { showToast } from '../../helpers/__globals_funcs'
const validationRules = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  last_name: Yup.string().required("Last name is required"),
  dob: Yup.date().required("Please choose a date"),
  gender: Yup.string().required("Please choose a gender"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().length(10).required().label("Phone"),
  father_name: Yup.string().required().label("Father name"),
  guardian_name: Yup.string().required().label('Gaurdian name'),
  course: Yup.string().required().label("Course"),
  semester: Yup.string().required().label("Semester"),
  category: Yup.string().required().label("Category"),
  address: Yup.string().required().label("Address"),
  password: Yup.string().required("Password required"),
  c_password: Yup.string().oneOf([Yup.ref("password"), null], "Passwords don't match").required()
})
const Register = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch()
  const genderList = [
    { title: "Male", value: "Male" },
    { title: "Female", value: "Female" },
    { title: "Prefer not to say", value: "Others" },
  ]
  const [semesterList, setSemesterList] = useState([])
  const [streamList, setStreamList] = useState([])
  const config = useSelector(s=>s.config)
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => { setSecureTextEntry(!secureTextEntry); console.log(props) }}>

      <Icon {...props} size={20} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  const fetchSemesters = async () => {
    await Api.get(baseURL + semester_listURL).then(({ data }) => {
      if (data.status) {
        let temp = data.data.map((item, index) => {
          return { title: item.name, value: item.code }
        })
        setSemesterList(temp);
      }
    }).catch(err => {
      console.log(("Register Sem", err));
    })
  }
  const fetchStreams = async () => {
    await Api.get(baseURL + stream_listURL).then(({ data }) => {
      if (data.status) {
        let temp = data.data.map((item, index) => {
          return { title: item.name, value: item.code }
        })
        setStreamList(temp);
      }
    }).catch(err => {
      console.log(("Register Stream", err));
    })
  }
  useEffect(() => {
    fetchSemesters();
    fetchStreams();
  }, [])
  const onRegister = async (values) => {
    setSpinner(true)
    dispatch(registerUser(values, () => {
      setSpinner(false)
    }, (err) => {
      setSpinner(false)
      showToast(err.message)
    }))
  }
  return (
    <Screen >
      <AppHeader>Register</AppHeader>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ padding: 20 }} >
        <Formik
          initialValues={{
            first_name: "",
            middle_name: "",
            last_name: "",
            dob: new Date("2000-01-01"),
            gender: "Male",
            email: "",
            phone: "",
            father_name: "",
            guardian_name: "",
            course: "",
            semester: "",
            category: "",
            address: "",
            password: "",
            c_password: ""
          }}
          onSubmit={onRegister}
          validationSchema={validationRules}
        >
          {({ handleChange, handleSubmit, setFieldTouched, errors, touched, values, isValid, setFieldValue }) => (
            <>
              <AppLayout  >
                <Text category='label' status={errors.first_name && touched.first_name ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >First name <Required /> </Text>
                <Input
                  value={values.first_name}
                  onChangeText={(text) => setFieldValue('first_name', text)}
                  onBlur={() => setFieldTouched('first_name')}
                  status={errors.first_name && touched.first_name ? 'danger' : 'basic'}
                  placeholder='Enter first_name'
                />
                <ErrorMessage error={errors.first_name} touched={touched.first_name} />
                <Text category='label' status={errors.middle_name && touched.middle_name ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Middle name </Text>
                <Input
                  value={values.middle_name}
                  onChangeText={(text) => setFieldValue('middle_name', text)}
                  onBlur={() => setFieldTouched('middle_name')}
                  status={errors.middle_name && touched.middle_name ? 'danger' : 'basic'}
                  placeholder='(optional)'
                />
                <ErrorMessage error={errors.middle_name} touched={touched.middle_name} />
                <Text category='label' status={errors.last_name && touched.last_name ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Last name <Required /> </Text>
                <Input
                  value={values.last_name}
                  onChangeText={(text) => setFieldValue('last_name', text)}
                  onBlur={() => setFieldTouched('last_name')}
                  status={errors.last_name && touched.last_name ? 'danger' : 'basic'}
                  placeholder='Enter last_name'
                />
                <ErrorMessage error={errors.last_name} touched={touched.last_name} />
                <Text category='label' status={errors.course && touched.course ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Course <Required /> </Text>
                <AppPicker data={streamList} value={values.course}
                  onChange={(value) => setFieldValue('course', value)}
                  onBlur={() => setFieldTouched('course')}
                  placeholder='Choose course'
                  status={errors.course && touched.course ? 'danger' : 'basic'}
                />
                <ErrorMessage error={errors.course} touched={touched.course} />
                <Text category='label' status={errors.semester && touched.semester ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Semester <Required /> </Text>
                <AppPicker data={semesterList} value={values.semester}
                  onChange={(value) => setFieldValue('semester', value)}
                  onBlur={() => setFieldTouched('semester')}
                  placeholder='Choose semester'
                  status={errors.semester && touched.semester ? 'danger' : 'basic'}
                />
                <ErrorMessage error={errors.semester} touched={touched.semester} />
                <Text category='label' status={errors.dob && touched.dob ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Date of birth <Required /> </Text>
                <Datepicker
                  date={values.dob}
                  min={new Date('1947-01-01')}
                  max={new Date()}
                  onBlur={() => setFieldTouched('semester')}
                  onSelect={nextDate => setFieldValue('dob', nextDate)}
                  status={errors.dob && touched.dob ? 'danger' : 'basic'}
                />
                <ErrorMessage error={errors.dob} touched={touched.dob} />
                <Text category='label' status={errors.father_name && touched.father_name ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Father name <Required /> </Text>
                <Input
                  value={values.father_name}
                  onChangeText={(text) => setFieldValue('father_name', text)}
                  onBlur={() => setFieldTouched('father_name')}
                  status={errors.father_name && touched.father_name ? 'danger' : 'basic'}
                  placeholder='Enter ...'
                />
                <ErrorMessage error={errors.father_name} touched={touched.father_name} />
                <Text category='label' status={errors.guardian_name && touched.guardian_name ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Gaurdian name <Required /> </Text>
                <Input
                  value={values.guardian_name}
                  onChangeText={(text) => setFieldValue('guardian_name', text)}
                  onBlur={() => setFieldTouched('guardian_name')}
                  status={errors.guardian_name && touched.guardian_name ? 'danger' : 'basic'}
                  placeholder='Enter ...'
                />
                <ErrorMessage error={errors.guardian_name} touched={touched.guardian_name} />
                <Text category='label' status={errors.gender && touched.gender ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Gender <Required /> </Text>
                <AppPicker data={genderList} value={values.gender}
                  onChange={(value) => setFieldValue('gender', value)}
                  onBlur={() => setFieldTouched('gender')}
                  status={errors.gender && touched.gender ? 'danger' : 'basic'}
                  placeholder='Choose gender'
                />
                <ErrorMessage error={errors.gender} touched={touched.gender} />
                <Text category='label' status={errors.category && touched.category ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Category <Required /> </Text>
                <Input
                  value={values.category}
                  onChangeText={(text) => setFieldValue('category', text)}
                  onBlur={() => setFieldTouched('category')}
                  status={errors.category && touched.category ? 'danger' : 'basic'}
                  placeholder='Enter ...'
                />
                <ErrorMessage error={errors.category} touched={touched.category} />
                <Text category='label' status={errors.email && touched.email ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Email <Required /> </Text>
                <Input
                  value={values.email}
                  onChangeText={(text) => setFieldValue('email', text)}
                  onBlur={() => setFieldTouched('email')}
                  status={errors.email && touched.email ? 'danger' : 'basic'}
                  placeholder='eg : mymail@mail.com'
                  keyboardType='email-address'
                />
                <ErrorMessage error={errors.email} touched={touched.email} />
                <Text category='label' status={errors.phone && touched.phone ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Phone <Required /> </Text>
                <Input
                  value={values.phone}
                  onChangeText={(text) => setFieldValue('phone', text)}
                  onBlur={() => setFieldTouched('phone')}
                  status={errors.phone && touched.phone ? 'danger' : 'basic'}
                  placeholder='eg : 1234567890'
                  keyboardType='number-pad'
                />
                <ErrorMessage error={errors.phone} touched={touched.phone} />
                <Text category='label' status={errors.address && touched.address ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Address <Required /> </Text>
                <Input
                  value={values.address}
                  onChangeText={(text) => setFieldValue('address', text)}
                  onBlur={() => setFieldTouched('address')}
                  status={errors.address && touched.address ? 'danger' : 'basic'}
                  placeholder='Enter your address'
                />
                <ErrorMessage error={errors.address} touched={touched.address} />
                <Text category='label' status={errors.password && touched.password ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Password <Required /> </Text>
                <Input
                  value={values.password}
                  onChangeText={(text) => setFieldValue('password', text)}
                  onBlur={() => setFieldTouched('password')}
                  status={errors.password && touched.password ? 'danger' : 'basic'}
                  // style={styles.input}

                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  placeholder='**************'
                />
                <ErrorMessage error={errors.password} touched={touched.password} />
                <Text category='label' status={errors.c_password && touched.c_password ? 'danger' : 'basic'} style={{ marginVertical: 10 }} >Confirm Password <Required /> </Text>
                <Input
                  value={values.c_password}
                  onChangeText={(text) => setFieldValue('c_password', text)}
                  onBlur={() => setFieldTouched('c_password')}
                  status={errors.c_password && touched.c_password ? 'danger' : 'basic'}
                  // style={styles.input}

                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  placeholder='**************'
                />
                <ErrorMessage error={errors.c_password} touched={touched.c_password} />
                <Spacer size={15} />
                <Button status='primary' disabled={spinner} onPress={handleSubmit} appearance={(spinner) ? "outline" : 'filled'} accessoryLeft={(spinner) ? LoadingIndicator : null}>{spinner ? "Register in progress..." : "Register yourself"} </Button>
                <Spacer size={15} />
                <Divider />
                <Spacer size={15} />
                <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                  <Text style={{ textAlign: 'center' }} >Already have account?{'\t'}<Text style={{ fontWeight: 'bold' }} status='primary'  >Go to login</Text></Text>
                </TouchableOpacity>
              </AppLayout>

            </>
          )}
        </Formik>
      </ScrollView>
    </Screen>
  )
}

export default Register

const styles = StyleSheet.create({})