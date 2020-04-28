import React, { useState, useEffect } from 'react'
import { SectionList } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

import { Appointment, SectionTitle } from '../src/components'

/* const DATA = [
	{
		title: '14 сентября',
		data: [
			{
				time: '15:30',
				diagnosis: 'продолжение лечения зубов',
				active: true,
				user: {
					fullName: 'Лариса Брежнева',
					phone: '+996 (555) 004 248',
					avatar: 'https://reactnative.dev/img/tiny_logo.png',
				},
			},
			{
				time: '18:30',
				diagnosis: 'чистка от зубного камня',
				user: {
					fullName: 'Барбарис Конфетович',
					phone: '+996 (700) 126 646',
					avatar: 'https://icon-icons.com/icons2/193/PNG/96/Yoda02_23226.png',
				},
			},
			{
				time: '15:30',
				diagnosis: 'продолжение лечения зубов',
				user: {
					fullName: 'Лариса Брежнева',
					phone: '+996 (555) 004 248',
					avatar: 'https://reactnative.dev/img/tiny_logo.png',
				},
			},
			{
				time: '18:30',
				diagnosis: 'чистка от зубного камня',
				user: {
					fullName: 'Барбарис Конфетович',
					phone: '+996 (700) 126 646',
					avatar: 'https://icon-icons.com/icons2/193/PNG/96/Yoda02_23226.png',
				},
			},
		],
	},
	{
		title: '16 сентября',
		data: [
			{
				time: '15:30',
				diagnosis: 'продолжение лечения зубов',
				user: {
					fullName: 'Лариса Брежнева',
					phone: '+996 (555) 004 248',
					avatar: 'https://reactnative.dev/img/tiny_logo.png',
				},
			},
			{
				time: '18:30',
				diagnosis: 'чистка от зубного камня',
				user: {
					fullName: 'Барбарис Конфетович',
					phone: '+996 (700) 126 646',
					avatar: 'https://icon-icons.com/icons2/193/PNG/96/Yoda02_23226.png',
				},
			},
			{
				time: '15:30',
				diagnosis: 'продолжение лечения зубов',
				user: {
					fullName: 'Лариса Брежнева',
					phone: '+996 (555) 004 248',
					avatar: 'https://reactnative.dev/img/tiny_logo.png',
				},
			},
			{
				time: '18:30',
				diagnosis: 'чистка от зубного камня',
				user: {
					fullName: 'Барбарис Конфетович',
					phone: '+996 (700) 126 646',
					avatar: 'https://icon-icons.com/icons2/193/PNG/96/Yoda02_23226.png',
				},
			},
		],
	},
] */

export default function HomeScreen({ navigation }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		axios.get('https://trycode.pw/c/Y0L1D.json').then(({ data }) => {
			setData(data)
		})
	})

	return (
		<Container>
			<SectionList
				style={{ paddingLeft: 20, paddingRight: 20 }}
				sections={data}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item }) => (
					<Appointment navigation={navigation} item={item} />
				)}
				renderSectionHeader={({ section: { title } }) => (
					<SectionTitle>{title}</SectionTitle>
				)}
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
