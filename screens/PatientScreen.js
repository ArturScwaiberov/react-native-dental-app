import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Platform, ActivityIndicator, FlatList, RefreshControl, Linking } from 'react-native'
import styled from 'styled-components'
import { Foundation, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

import { GrayText, Button, Badge } from '../src/components'
import { patientsApi, phoneFormat } from '../utils'

const PatientScreen = ({ route, navigation }) => {
	const { patientId, userName, userPhone, userEmail } = route.params
	const [appointments, setAppointments] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useFocusEffect(
		React.useCallback(() => {
			fetchPatientsAppointments()
		}, [])
	)

	const fetchPatientsAppointments = () => {
		patientsApi
			.show(patientId)
			.then(({ data }) => {
				setAppointments(data.data.appointments)
			})
			.catch((error) => {
				error.request ? console.log(error.request) : console.log('Error', error.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(fetchPatientsAppointments, [])

	const EmailRow = () => {
		if (userEmail) {
			return <GrayText style={{ marginBottom: 20 }}>{userEmail}</GrayText>
		} else {
			return null
		}
	}

	return (
		<Container>
			<View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 30 }}>
				<PatientFullName>{userName}</PatientFullName>
				<GrayText style={{ marginBottom: 10 }}>{phoneFormat(userPhone)}</GrayText>
				<EmailRow />
				<ButtonsWrapper>
					<Button>Формула зубов</Button>
					<CallButton onPress={() => Linking.openURL('tel:+' + userPhone)}>
						<Foundation
							style={{ marginTop: Platform.OS === 'ios' ? 2 : 0 }}
							name='telephone'
							size={30}
							color='white'
						/>
					</CallButton>
				</ButtonsWrapper>
			</View>

			<PatientAppointments>
				<GrayText
					style={{
						color: '#000',
						fontSize: 18,
						fontWeight: 'bold',
						marginTop: 26,
						marginBottom: 13,
					}}
				>
					{appointments.length > 0
						? `Приемы (${appointments.length})`
						: `У пациента ${userName} нет приемов, нажмите + для создания приема`}
				</GrayText>
				{isLoading ? (
					<ActivityIndicator size='large' color='#2A86FF' />
				) : (
					<FlatList
						data={appointments}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<AppointmentCard
								key={item._id}
								style={{
									shadowColor: 'gray',
									shadowOffset: { width: 0, height: 0 },
									shadowOpacity: 0.1,
									shadowRadius: 2,
									elevation: 1,
								}}
							>
								<MoreButton onPress={() => alert(userName)}>
									<Ionicons
										name='md-more'
										size={34}
										color='#A3A3A3'
										onPress={() => alert(userName)}
									/>
								</MoreButton>
								<AppointmentCardRow>
									<Foundation style={{ marginRight: 10 }} name='wrench' size={20} color='#A3A3A3' />
									<AppointmentCardLabel>
										Зуб: <Bold>{item.dentNumber}</Bold>
									</AppointmentCardLabel>
								</AppointmentCardRow>

								<AppointmentCardRow>
									<MaterialCommunityIcons
										style={{ marginRight: 7 }}
										name='clipboard-text'
										size={20}
										color='#A3A3A3'
									/>
									<AppointmentCardLabel>
										Диагноз: <Bold>{item.diagnosis}</Bold>
									</AppointmentCardLabel>
								</AppointmentCardRow>

								<AppointmentCardRow>
									<ButtonsWrapper style={{ flex: 1 }}>
										<Badge active>
											{item.date} - {item.time}
										</Badge>
										<Badge color='green' style={{ fontWeight: 'bold' }}>
											{item.price} с
										</Badge>
									</ButtonsWrapper>
								</AppointmentCardRow>
							</AppointmentCard>
						)}
						refreshControl={
							<RefreshControl refreshing={isLoading} onRefresh={fetchPatientsAppointments} />
						}
						ListEmptyComponent={<ActionText></ActionText>}
					/>
				)}
			</PatientAppointments>
		</Container>
	)
}

const MoreButton = styled.TouchableOpacity({
	position: 'absolute',
	right: 0,
	top: 0,
	justifyContent: 'center',
	alignItems: 'center',
	borderTopRightRadius: 4,
	borderBottomLeftRadius: 4,
	width: 44,
	height: 44,
	backgroundColor: '#f5f5f5',
})

const AppointmentCardRow = styled.View({
	flexDirection: 'row',
	marginBottom: 7.5,
	marginTop: 7.5,
})

const Bold = styled.Text({
	color: '#000',
	fontSize: 16,
	fontWeight: 'bold',
})

const AppointmentCardLabel = styled.Text({
	color: '#000',
	fontSize: 16,
})

const AppointmentCard = styled.View({
	backgroundColor: '#fff',
	borderRadius: 10,
	paddingTop: 14,
	paddingBottom: 14,
	paddingLeft: 20,
	paddingRight: 20,
	marginBottom: 20,
})

const PatientAppointments = styled.View({
	flex: 1,
	backgroundColor: '#f8fafd',
	paddingLeft: 20,
	paddingRight: 20,
})

const Container = styled.SafeAreaView({
	flex: 1,
	backgroundColor: '#fff',
})

const PatientFullName = styled.Text({
	marginTop: 20,
	fontWeight: 'bold',
	fontSize: 28,
	marginBottom: 7,
})

const ButtonsWrapper = styled.View({
	flexDirection: 'row',
	justifyContent: 'space-between',
})

const PriceButton = styled.TouchableOpacity({
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '45px',
	backgroundColor: 'rgba(132, 210, 105, 0.21)',
	marginLeft: 10,
	paddingLeft: 15,
	paddingRight: 15,
})

const CallButton = styled.TouchableOpacity({
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '45px',
	width: '45px',
	height: '45px',
	backgroundColor: '#84D269',
	marginLeft: 10,
})

const ActionText = styled.Text({
	color: 'red',
	fontSize: 16,
	backgroundColor: 'transparent',
	padding: 10,
})

export default PatientScreen
