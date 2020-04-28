import React from 'react'
import { View, Platform } from 'react-native'
import styled from 'styled-components'
import {
	Foundation,
	MaterialCommunityIcons,
	Ionicons,
} from '@expo/vector-icons'

import { GrayText, Button, Badge } from '../src/components'

export default function PatientScreen({ route, navigation }) {
	const { userName, userPhone } = route.params
	return (
		<Container>
			<View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 30 }}>
				<PatientFullName>{userName}</PatientFullName>
				<GrayText style={{ marginBottom: 19 }}>{userPhone}</GrayText>
				<ButtonsWrapper>
					<Button>Формула зубов</Button>
					<CallButton>
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
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
					<GrayText
						style={{
							color: '#000',
							fontSize: 18,
							fontWeight: 'bold',
							marginTop: 26,
							marginBottom: 13,
						}}
					>
						Приемы
					</GrayText>
					<AppointmentCard
						style={{
							shadowColor: 'gray',
							shadowOffset: {
								width: 0,
								height: 0,
							},
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
							<Foundation
								style={{ marginRight: 10 }}
								name='wrench'
								size={20}
								color='#A3A3A3'
							/>
							<AppointmentCardLabel>
								Зуб: <Bold>12</Bold>
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
								Диагноз: <Bold>пульпит</Bold>
							</AppointmentCardLabel>
						</AppointmentCardRow>

						<AppointmentCardRow>
							<ButtonsWrapper style={{ flex: 1 }}>
								<Badge active>22.04.2020 - 15:40</Badge>
								<Badge color='green' style={{ fontWeight: 'bold' }}>
									1500 с
								</Badge>
							</ButtonsWrapper>
						</AppointmentCardRow>

						{/* <ButtonsWrapper>
							<Button>22.04.2020 - 15:40</Button>
							<PriceButton>
								<GrayText style={{ color: '#61BB42', fontWeight: 'bold' }}>
									1500 Р
								</GrayText>
							</PriceButton>
						</ButtonsWrapper> */}
					</AppointmentCard>
				</View>
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
})

const PatientAppointments = styled.View({ flex: 1, backgroundColor: '#f8fafd' })

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
