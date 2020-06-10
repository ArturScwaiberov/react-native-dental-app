import React, { useState, useEffect } from 'react'
import { useFocusEffect, useScrollToTop } from '@react-navigation/native'
import { Animated, FlatList, RefreshControl, Alert, StyleSheet } from 'react-native'
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
	const ref = React.useRef(null)
	const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
	const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

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
			})
			.catch((error) => {
				error.request ? console.log(error.request) : console.log('Error', error.message)
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

	const removePatient = (id) => {
		Alert.alert(
			'Удаление пациента',
			'Вы действительно хотите удалить пациента и его приемы?',
			[
				{
					text: 'Отмена',
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
				navigation.navigate('EditPatient')
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

	const onSearch = (e) => {
		setSearchValue(e.nativeEvent.text)
	}

	let translateY = animatedValue.interpolate({
		inputRange: [0, 44],
		outputRange: [0, -60],
		extrapolate: 'clamp',
	})

	return (
		<Container>
			{data ? (
				<>
					<AnimatedFlatList
						scrollToOverflowEnabled={true}
						ref={ref}
						style={{ paddingLeft: 20, paddingRight: 20 }}
						contentContainerStyle={{ paddingTop: 55, flexGrow: 1 }}
						scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { y: animatedValue } } }],
							{ useNativeDriver: true } // <-- Add this
						)}
						data={data.filter(
							(item) => item.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
						)}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<Swipeable
								renderRightActions={(progress) => renderRightActions(progress, item._id)}
								friction={2}
							>
								<Patient navigation={navigation} item={item} />
							</Swipeable>
						)}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={cleanFetch} />}
						ListEmptyComponent={
							<ActionText style={{ color: 'red', padding: 0 }}>
								Такой пациент не найден..
							</ActionText>
						}
					/>
					<Animated.View
						style={[
							{ position: 'absolute', height: 60, left: 0, right: 0 },
							{ transform: [{ translateY }] },
						]}
					>
						<Header searchBar rounded style={{ paddingTop: 0, height: 61 }}>
							<Item>
								<Icon name='ios-search' />
								<Input placeholder='Поиск...' clearButtonMode='always' onChange={onSearch} />
								<Icon name='ios-people' />
							</Item>
						</Header>
					</Animated.View>
				</>
			) : (
				<ActionText style={{ color: 'red' }}>
					Пожалуйста проверьте соединение с сервером...
				</ActionText>
			)}
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

const styles = StyleSheet.create({
	headerWrapper: {},
})

export default PatientsListScreen
