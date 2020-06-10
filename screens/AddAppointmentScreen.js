import React, { useState } from 'react'
import { Keyboard, Platform, Alert } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Icon, Text, Button } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker'
import styled from 'styled-components/native'
import { YellowBox } from 'react-native'

import { appointmentsApi } from '../utils'

const AddAppointmentScreen = ({ route, navigation }) => {
	const [values, setValues] = useState({
		patientId: route.params?.patientId ?? '',
	})
	const [date, setDate] = useState(new Date())
	const [mode, setMode] = useState('date')
	const [show, setShow] = useState(false)

	const setFieldValue = (name, value) => {
		setValues({
			...values,
			[name]: value,
		})
	}

	const handleChange = (name, e) => {
		const text = e.nativeEvent.text
		setFieldValue(name, text)
	}

	const fielsdName = {
		dentNumber: 'Номер зуба',
		diagnosis: 'Диагноз',
		price: 'Цена',
		date: 'Дата',
		time: 'Время',
	}

	const submitHandler = () => {
		appointmentsApi
			.add(values)
			.then(() => {
				navigation.navigate('Patient')
			})
			.catch((e) => {
				if (e.response.data && e.response.data.message) {
					Keyboard.dismiss()
					e.response.data.message.forEach((err) => {
						const fieldName = err.param
						Alert.alert(
							'Внимание',
							`Поле "${fielsdName[fieldName]}" не заполнено или заполнено не верно.`
						)
					})
				}
			})
		/* alert(JSON.stringify(values)) */
	}

	const formatDate = (date) => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear()

		if (month.length < 2) month = '0' + month
		if (day.length < 2) day = '0' + day

		return [year, month, day].join('-')
	}

	const formatTime = (time) => {
		return time.toTimeString().split(' ')[0].slice(0, 5)
	}

	const onChange = (event, selectedDate) => {
		Keyboard.dismiss()
		const currentDate = selectedDate || date
		const date = formatDate(currentDate)
		const time = formatTime(currentDate)
		setShow(Platform.OS === 'ios')
		setDate(currentDate)
		setValues({
			...values,
			['date']: date,
			['time']: time,
		})
	}

	const showMode = (currentMode) => {
		show ? setShow(false) : setShow(true)
		setMode(currentMode)
	}

	const showDatepicker = () => {
		Keyboard.dismiss()
		showMode('datetime')
	}

	return (
		<Container>
			<Content style={{ paddingLeft: 20, paddingRight: 20 }}>
				<Form>
					<Item picker /* floatingLabel */>
						<Input
							onChange={handleChange.bind(this, 'dentNumber')}
							value={values.dentNumber}
							keyboardType='number-pad'
							clearButtonMode='while-editing'
							placeholder='* Номер зуба'
						/>
					</Item>
					<Item picker>
						<Input
							onChange={handleChange.bind(this, 'diagnosis')}
							value={values.diagnosis}
							clearButtonMode='while-editing'
							placeholder='* Диагноз'
						/>
					</Item>
					<Item picker>
						<Input
							onChange={handleChange.bind(this, 'description')}
							value={values.description}
							multiline
							clearButtonMode='while-editing'
							placeholder='Подробное описание или заметка'
							style={{ paddingTop: 15, paddingBottom: 15 }}
						/>
					</Item>
					<Item picker>
						<Input
							onChange={handleChange.bind(this, 'price')}
							value={values.price}
							keyboardType='number-pad'
							clearButtonMode='while-editing'
							placeholder='* Цена'
						/>
					</Item>

					<Item picker>
						<ButtonRN onPress={showDatepicker}>
							<Text style={{ fontSize: 17, fontWeight: '400' }}>
								* Дата:{values.date ? ' ' + formatDate(date) : ' гггг-мм-дд'} время:
								{values.time ? ' ' + formatTime(date) : ' чч:мм'}
							</Text>
						</ButtonRN>
					</Item>

					{show && (
						<DateTimePicker
							timeZoneOffsetInSeconds={21600}
							minimumDate={new Date()}
							value={date}
							mode={mode}
							is24Hour={true}
							display='default'
							locale='ru-RU'
							minuteInterval={10}
							onChange={onChange}
						/>
					)}

					<ButtonView>
						<Button
							onPress={submitHandler}
							rounded
							block
							iconLeft
							style={{ backgroundColor: '#84D269' }}
						>
							<Icon type='Entypo' name='plus' style={{ color: '#fff' }} />
							<Text style={{ color: '#fff' }}>Добавить прием</Text>
						</Button>
					</ButtonView>
					<Label style={{ marginTop: 10, fontSize: 16 }}>
						Поля помеченные звездочкой <TomatoText>*</TomatoText> обязательны для заполнения
					</Label>
				</Form>
			</Content>
		</Container>
	)
}

const ButtonRN = styled.TouchableOpacity({
	paddingTop: 15,
	paddingBottom: 15,
	paddingLeft: 5,
})

const ButtonView = styled.View({
	marginTop: 15,
})

const TomatoText = styled.Text({
	color: 'tomato',
})

export default AddAppointmentScreen
