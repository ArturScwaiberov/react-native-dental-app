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
  Thumbnail,
} from 'native-base'
import styled from 'styled-components/native'

import { Keyboard } from 'react-native'

const LoginScreen = ({ navigation }) => {
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
    navigation.navigate('ConfirmNumberScreen')
  }

  return (
    <Container>
      <Content style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
        <Thumbnail
          source={require('../src/images/dent_example_logo.jpg')}
          style={{ height: 200, width: null, flex: 1 }}
        />
        <Form>
          <Label style={{ marginBottom: 20, fontSize: 16, color: '#777', textAlign: 'center' }}>
            Введите Ваш номер телефона.
          </Label>

          <Item picker>
            <Input
              onChange={handleInputChange.bind(this, 'phone')}
              value={values.phone}
              keyboardType='phone-pad'
              clearButtonMode='while-editing'
              placeholder='996 *** *** ***'
              placeholderTextColor='#777'
            />
          </Item>

          <ButtonView>
            <Button
              onPress={submitHandler}
              rounded
              /* block
              iconRight */
              style={{ backgroundColor: '#84D269' }}
              color='#84D269'
              disabled={values?.phone?.length < 10 ? true : false}
            >
              <Text style={{ color: '#fff' }}>Далее</Text>
              <Icon type='MaterialIcons' name='navigate-next' style={{ color: '#fff' }} />
            </Button>
          </ButtonView>
          <Label style={{ marginTop: 20, fontSize: 14, color: '#777', textAlign: 'center' }}>
            Нет аккаунта?{' '}
            <TomatoText
              onPress={() => {
                navigation.navigate('AuthScreen')
              }}
            >
              Регистрация
            </TomatoText>
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
export default LoginScreen
