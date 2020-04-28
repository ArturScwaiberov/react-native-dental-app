import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, PatientScreen } from './screens'

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{
						title: 'Пациенты',
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
						headerTitleAlign: 'left',
						headerTitleStyle: {
							fontWeight: 'bold',
							fontSize: 20,
						},
						headerBackTitle: ' ',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
