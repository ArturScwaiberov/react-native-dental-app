import React, { useState, useEffect } from 'react'
import { Animated, FlatList, RefreshControl, Alert } from 'react-native'
import styled from 'styled-components/native'
import { Octicons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { patientsApi } from '../utils/api'
import { Patient } from '../src/components'

const PatientsListScreen = ({ navigation }) => {
	const [data, setData] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	const fetchPatients = () => {
		setRefreshing(true)
		patientsApi
			.get()
			.then(({ data }) => {
				setData(data.message)
				setRefreshing(false)
			})
			.catch((e) => {
				setRefreshing(false)
				console.log(e)
			})
	}

	useEffect(fetchPatients, [])

	const removePatient = (id) => {
		Alert.alert(
			'Удаление пациента',
			'Вы действительно хотите удалить пациента и его приемы?',
			[
				{
					text: 'Отмена',
					onPress: () => console.log('Cancel'),
					style: 'cancel',
				},
				{
					text: 'Да, удалить',
					onPress: () => {
						const result = data.filter((item) => item._id !== id)
						setData(result)
						patientsApi.remove(id)
					},
					style: 'default',
				},
			],
			{ cancelable: false }
		)
	}

	renderRightAction = (text, color, x, progress, id) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
		})

		const pressHandler = () => {
			if (text === 'pencil') {
				alert('hey')
			} else {
				removePatient(id)
			}
		}

		return (
			<Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
				<RectButton
					style={{
						alignItems: 'center',
						flex: 1,
						justifyContent: 'center',
						backgroundColor: color,
					}}
					onPress={pressHandler}
				>
					<ActionText>
						<Octicons name={text} size={24} color='white' />
					</ActionText>
				</RectButton>
			</Animated.View>
		)
	}

	renderRightActions = (progress, id) => (
		<RightButtonsHandler>
			{renderRightAction('pencil', '#B4C1CB', 160, progress, id)}
			{renderRightAction('trashcan', '#F85A5A', 80, progress, id)}
		</RightButtonsHandler>
	)

	return (
		<Container>
			<FlatList
				style={{ paddingLeft: 20, paddingRight: 20 }}
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<Swipeable
						renderRightActions={(progress) => renderRightActions(progress, item._id)}
						friction={2}
					>
						<Patient navigation={navigation} item={item} />
					</Swipeable>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPatients} />}
			/>
		</Container>
	)
}

const Container = styled.SafeAreaView({
	flex: 1,
	backgroundColor: '#fff',
})

const RightButtonsHandler = styled.View({
	width: 160,
	flexDirection: 'row',
	marginLeft: 20,
})

const ActionText = styled.Text({
	color: 'white',
	fontSize: 16,
	backgroundColor: 'transparent',
	padding: 10,
})

export default PatientsListScreen
