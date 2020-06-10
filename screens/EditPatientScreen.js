import React, { useState } from 'react'
import {
	Container,
	Content,
	Form,
	Item,
	Input,
	Label,
	Icon,
	Text,
	Button,
	Picker,
} from 'native-base'
import styled from 'styled-components/native'

import { patientsApi } from '../utils'

const EditPatientScreen = ({ navigation }) => {
	const [values, setValues] = useState({})

	const setFieldValue = (name, value) => {
		setValues({
			...values,
			[name]: value,
		})
	}

	const handleInputChange = (name, e) => {
		const text = e.nativeEvent.text
		setFieldValue(name, text)
	}

	const submitHandler = () => {
		patientsApi
			.add(values)
			.then(() => {
				navigation.navigate('PatientsList')
			})
			.catch((e) => {
				alert(e)
			})
		/* alert(JSON.stringify(values)) */
	}

	return (
		<Container>
			<Content style={{ paddingLeft: 20, paddingRight: 20 }}>
				<Form>
					<Item picker style={{ borderWidth: 0 }} /* floatingLabel */>
						{/* <Label>Аватар</Label> */}
						<Input
							onChange={handleInputChange.bind(this, 'avatar')}
							value={values.avatar}
							clearButtonMode='while-editing'
							placeholder='Аватар'
						/>
					</Item>
					<Item picker>
						<Input
							onChange={handleInputChange.bind(this, 'fullName')}
							value={values.fullName}
							clearButtonMode='while-editing'
							placeholder='* ФИО (мин 4)'
							/* autoFocus */
						/>
					</Item>
					<Item picker>
						<Input
							onChange={handleInputChange.bind(this, 'phone')}
							value={values.phone}
							keyboardType='phone-pad'
							clearButtonMode='while-editing'
							placeholder='* 996-700-126-646'
						/>
					</Item>
					<Item picker>
						<Input
							onChange={handleInputChange.bind(this, 'email')}
							value={values.email}
							keyboardType='email-address'
							clearButtonMode='while-editing'
							placeholder='* Почта'
						/>
					</Item>

					<Item picker /* style={{ marginTop: 20 }} */>
						<Picker
							mode='dropdown'
							iosHeader='Выберите пол'
							headerBackButtonText='Отмена'
							headerTitleStyle={{ color: '#2A86FF', width: 200, fontWeight: 'bold', fontSize: 20 }}
							iosIcon={<Icon name='arrow-down' />}
							placeholder='* Пол пациента'
							selectedValue={values.gender}
							onValueChange={setFieldValue.bind(this, 'gender')}
						>
							<Picker.Item label='Мужской' value='male' />
							<Picker.Item label='Женский' value='femail' />
						</Picker>
					</Item>

					<ButtonView>
						<Button
							onPress={submitHandler}
							rounded
							block
							iconLeft
							style={{ backgroundColor: '#84D269' }}
						>
							<Icon type='Entypo' name='plus' style={{ color: '#fff' }} />
							<Text style={{ color: '#fff' }}>Добавить пациента</Text>
						</Button>
					</ButtonView>
					<Label style={{ marginTop: 20, fontSize: 16 }}>
						Поля помеченные звездочкой <TomatoText>*</TomatoText> обязательны для заполнения
					</Label>
				</Form>
			</Content>
		</Container>
	)
}

const ButtonView = styled.View({
	marginTop: 30,
})

const TomatoText = styled.Text({
	color: 'tomato',
})

export default EditPatientScreen
