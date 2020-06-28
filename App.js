import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { Button } from 'react-native'

// сделать попап для приема в карте пациента
// 				сделать формулу зубов
// 				если прием завершен, то подсвечивать зуб

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
import { View, Text, Button, Icon } from 'native-base'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HeaderRight = ({ patientId, target }) => {
	const navigation = useNavigation()

	return (
		<Button transparent onPress={() => navigation.navigate(target, { patientId })}>
			<Icon name='plus' type='Entypo' style={{ fontSize: 26 }} />
		</Button>
	)
}

function Appointments({ route, navigation }) {
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

export default function App() {
	return (
		<NavigationContainer>
			<Home />
		</NavigationContainer>
	)
}
