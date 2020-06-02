import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { Button } from 'react-native'

import {
	HomeScreen,
	PatientScreen,
	AddPatientScreen,
	PatientsListScreen,
	AddAppointmentScreen,
} from './screens'
import { View, Text, Button, Icon } from 'native-base'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HeaderRight = ({ navigation, target }) => {
	return (
		<Button transparent onPress={() => navigation.navigate(target)}>
			<Icon name='plus' type='Entypo' style={{ fontSize: 26 }} />
		</Button>
	)
}

function Appointments({ navigation }) {
	return (
		<Stack.Navigator initialRouteName='Home'>
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
		</Stack.Navigator>
	)
}

function Patients({ route, navigation }) {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen
				name='Home'
				component={PatientsListScreen}
				options={{
					title: 'Пациенты',
					headerTintColor: '#2A86FF',
					headerTitleAlign: 'left',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
					},
					headerRight: () => <HeaderRight navigation={navigation} target={'AddPatient'} />,
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
					headerRight: () => <HeaderRight navigation={navigation} target={'AddAppointment'} />,
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

export default function App() {
	return (
		<NavigationContainer>
			<Home />
		</NavigationContainer>
	)
}
