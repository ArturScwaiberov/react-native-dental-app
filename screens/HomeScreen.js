import React, { useState, useEffect } from 'react'
import { Animated, SectionList, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons, Octicons } from '@expo/vector-icons'
import axios from 'axios'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { appointmentsApi } from '../utils/api'
import { Appointment, SectionTitle } from '../src/components'

const HomeScreen = ({ navigation }) => {
	const [data, setData] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	const fetchAppointments = () => {
		setRefreshing(true)
		appointmentsApi
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

	useEffect(fetchAppointments, [])

	const removeAppointment = (id) => {
		console.log(id)
		const result = data.map((group) => {
			group.data = group.data.filter((item) => item._id !== id)
			return group
		})
		setData(result)
		//appointmentsApi.remove(id)
	}

	renderRightAction = (text, color, x, progress) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
		})

		const pressHandler = () => {
			if (text === 'pencil') {
				alert('hey')
			} else {
				//but how to get over here the ID of item from SectionList?
				removeAppointment(id)
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

	renderRightActions = (progress) => (
		<RightButtonsHandler>
			{renderRightAction('pencil', '#B4C1CB', 160, progress)}
			{renderRightAction('trashcan', '#F85A5A', 80, progress)}
		</RightButtonsHandler>
	)

	return (
		<Container>
			<SectionList
				style={{ paddingLeft: 20, paddingRight: 20 }}
				sections={data}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item }) => (
					<Swipeable renderRightActions={renderRightActions} friction={2}>
						<Appointment navigation={navigation} item={item} />
					</Swipeable>
				)}
				renderSectionHeader={({ section: { title } }) => <SectionTitle>{title}</SectionTitle>}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAppointments} />}
			/>
			<PluseButton
				style={{
					shadowColor: '#2A86FF',
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.3,
					shadowRadius: 4.65,
					elevation: 8,
				}}
				onPress={() => navigation.navigate('AddPatient')}
			>
				<Ionicons name='ios-add' size={32} color='white' />
			</PluseButton>
		</Container>
	)
}

const PluseButton = styled.TouchableOpacity({
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '50px',
	width: '64px',
	height: '64px',
	backgroundColor: '#2A86FF',
	position: 'absolute',
	bottom: 25,
	right: 25,
})

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

export default HomeScreen
