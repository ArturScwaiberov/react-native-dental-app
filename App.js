import React, { useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import {
  HomeScreen,
  PatientScreen,
  AddPatientScreen,
  PatientsListScreen,
  AddAppointmentScreen,
  EditPatientScreen,
  EditAppointmentScreen,
  ToothFormulaScreen,
} from './screens'
import { Button, Icon } from 'native-base'
import AuthScreen from './screens/AuthScreen'
import LoginScreen from './screens/LoginScreen'
import ConfirmNumberScreen from './screens/ConfirmNumberScreen'
import EnterPasswordScreen from './screens/EnterPasswordScreen'
import AppointmentDateScreen from './screens/AppointmentDateScreen'
import ConfirmAppointmentScreen from './screens/ConfirmAppointmentScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HeaderRight = ({ patientId, target }) => {
  const navigation = useNavigation()

  return (
    <Button transparent onPress={() => navigation.navigate(target, { patientId })}>
      <Icon name='plus' type='Entypo' style={{ fontSize: 26, color: '#2A86FF' }} />
    </Button>
  )
}

function Auth({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          title: 'Вход в кабинет',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name='AuthScreen'
        component={AuthScreen}
        options={{
          title: 'Регистрация',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            textAlign: 'center',
          },
          headerBackTitleVisible: false,
          headerLeft: () => {},
        }}
      />
      <Stack.Screen
        name='ConfirmNumberScreen'
        component={ConfirmNumberScreen}
        options={{
          title: 'Введите смс код',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            textAlign: 'center',
          },
          headerBackTitleVisible: false,
          headerLeft: () => {},
        }}
      />
      <Stack.Screen
        name='EnterPasswordScreen'
        component={EnterPasswordScreen}
        options={{
          title: 'Вход / Регистрация',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            textAlign: 'center',
          },
          headerBackTitleVisible: false,
          headerLeft: () => {},
        }}
      />
      <Stack.Screen name='EnterHome' component={Home} options={{ header: () => {} }} />
    </Stack.Navigator>
  )
}

function Appointments({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AppointmentDateScreen'
        component={AppointmentDateScreen}
        options={{
          title: 'Запись на прием',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
          },
        }}
      />
      <Stack.Screen
        name='ConfirmAppointmentScreen'
        component={ConfirmAppointmentScreen}
        options={{
          title: 'Укажите подробности',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
          headerLeft: () => {},
        }}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Приемы',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
          headerLeft: () => {},
        }}
      />
      <Stack.Screen
        name='Patient'
        component={PatientScreen}
        options={{
          title: 'Карта пациента',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='ToothFormula'
        component={ToothFormulaScreen}
        options={{
          title: 'Формула зубов',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='EditAppointment'
        component={EditAppointmentScreen}
        options={{
          title: 'Редактировать прием',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

function Patients({ route, navigation }) {
  return (
    <Stack.Navigator initialRouteName='PatientsList'>
      <Stack.Screen
        name='PatientsList'
        component={PatientsListScreen}
        options={{
          title: 'Пациенты',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
          },
          headerRight: () => <HeaderRight target={'AddPatient'} />,
        }}
      />
      <Stack.Screen
        name='Patient'
        component={PatientScreen}
        options={({ route, navigation }) => {
          return {
            title: 'Карта пациента',
            headerTintColor: '#2A86FF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerBackTitleVisible: false,
            headerLeft: () => {},
            headerRight: () => (
              <HeaderRight target={'AddAppointment'} patientId={route.params.patientId} />
            ),
          }
        }}
      />
      <Stack.Screen
        name='ToothFormula'
        component={ToothFormulaScreen}
        options={{
          title: 'Формула зубов',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='AddPatient'
        component={AddPatientScreen}
        options={{
          title: 'Добавить пациента',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='AddAppointment'
        component={AddAppointmentScreen}
        options={{
          title: 'Добавить прием',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='EditPatient'
        component={EditPatientScreen}
        options={{
          title: 'Редактировать пацента',
          headerTintColor: '#2A86FF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

function Home({ navigation }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: '#ccc',
        activeTintColor: '#2A86FF',
        showLabel: false,
      }}
    >
      <Tab.Screen
        name='Приемы'
        component={Appointments}
        options={{
          tabBarLabel: 'Приемы',
          tabBarIcon: ({ color }) => (
            <Icon name='calendar' type='Entypo' style={{ color: color }} />
          ),
        }}
      />
      <Tab.Screen
        name='Пациенты'
        component={Patients}
        options={{
          tabBarLabel: 'Пациенты',
          tabBarIcon: ({ color }) => <Icon name='v-card' type='Entypo' style={{ color: color }} />,
        }}
      />
    </Tab.Navigator>
  )
}

async function fetchFonts() {
  await Font.loadAsync({
    Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  )
}
