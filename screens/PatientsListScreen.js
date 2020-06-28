import React, { useState, useEffect } from 'react'
import { useFocusEffect, useScrollToTop } from '@react-navigation/native'
import { Animated, RefreshControl, Alert } from 'react-native'
import styled from 'styled-components/native'
import { Octicons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Header, Item, Input, Icon } from 'native-base'

import { patientsApi } from '../utils'
import { Patient } from '../src/components'

const PatientsListScreen = ({ navigation }) => {
	const [data, setData] = useState(null)
	const [searchValue, setSearchValue] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
	const [refsArray, setRefsArray] = useState([])
	const [noConnection, setNoConnection] = useState(false)
	const ref = React.useRef(null)

	useFocusEffect(
		React.useCallback(() => {
			cleanFetch()
		}, [])
	)

	useScrollToTop(ref)

	const cleanFetch = () => {
		patientsApi
			.get()
			.then(({ data }) => {
				setData(data.message)
				setNoConnection(false)
			})
			.catch((error) => {
				/* error.request ? setNoConnection(true) : console.log('Error', error.message) */
				setNoConnection(true)
			})
			.finally(() => {
				setRefreshing(false)
			})
	}

	const fetchPatients = () => {
		setRefreshing(true)
		cleanFetch()
	}

	useEffect(fetchPatients, [])

	const removePatient = (id, closeRow) => {
		Alert.alert(
			'Удаление пациента',
			'Вы действительно хотите удалить пациента и его приемы?',
			[
				{
					text: 'Отмена',
					onPress: () => {
						closeRow()
					},
					style: 'cancel',
				},
				{
					text: 'Да, удалить',
					onPress: () => {
						closeRow()
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

	renderRightAction = (text, color, x, progress, id, item, index) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
		})

		const closeRow = () => {
			refsArray[index].close()
		}

		const pressHandler = () => {
			if (text === 'pencil') {
				closeRow()
				navigation.navigate('EditPatient', { patientId: item })
			} else {
				removePatient(id, closeRow)
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

	renderRightActions = (progress, id, item, index) => (
		<RightButtonsHandler>
			{renderRightAction('pencil', '#B4C1CB', 160, progress, id, item, index)}
			{renderRightAction('trashcan', '#F85A5A', 80, progress, id, item, index)}
		</RightButtonsHandler>
	)

	const onSearch = (e) => {
		setSearchValue(e.nativeEvent.text)
	}

	const HEADER_HEIGHT = 60

	let translateY = animatedValue.interpolate({
		inputRange: [0, HEADER_HEIGHT * 0.7],
		outputRange: [0, -HEADER_HEIGHT],
		extrapolate: 'clamp',
	})

	const listEmptyComponent = () => {
		return noConnection === false ? (
			<ActionText style={{ color: '#816CFF', padding: 0 }}>
				Ни одного пациента не найдено... 💁‍♀️
			</ActionText>
		) : (
			<ActionText style={{ color: '#F38181' }}>
				Пожалуйста проверьте соединение с сервером... ⚙️
			</ActionText>
		)
	}

	return (
		<Container>
			<Animated.FlatList
				scrollToOverflowEnabled={true}
				ref={ref}
				style={{ paddingLeft: 20, paddingRight: 20 }}
				contentContainerStyle={{ paddingTop: HEADER_HEIGHT, flexGrow: 1 }}
				scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: animatedValue } } }],
					{ useNativeDriver: true } // <-- Add this
				)}
				data={
					data
						? data.filter(
								(item) => item.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
						  )
						: null
				}
				keyExtractor={(item) => item._id}
				renderItem={({ item, index }) => (
					<Swipeable
						ref={(ref) => {
							refsArray[index] = ref
						}}
						renderRightActions={(progress) => renderRightActions(progress, item._id, item, index)}
						index={index}
						friction={2}
					>
						<Patient navigation={navigation} item={item} />
					</Swipeable>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPatients} />}
				ListEmptyComponent={() => listEmptyComponent()}
			/>
			<Animated.View
				style={[
					{ position: 'absolute', height: HEADER_HEIGHT, left: 0, right: 0 },
					{ transform: [{ translateY }] },
				]}
			>
				<Header searchBar rounded style={{ paddingTop: 0, height: HEADER_HEIGHT + 1 }}>
					<Item>
						<Icon name='ios-search' />
						<Input placeholder='Поиск...' clearButtonMode='always' onChange={onSearch} />
						<Icon name='ios-people' />
					</Item>
				</Header>
			</Animated.View>
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
