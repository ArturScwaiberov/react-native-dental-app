import React from 'react'
import { Container, Content } from 'native-base'
import Calendar from '../src/components/Calendar'

const AppointmentDateScreen = ({ navigation, route }) => {
  /* const date = new Date('April 17, 2021 03:24:00') */
  const date = new Date()

  return (
    <Container>
      <Content style={safe}>
        <Calendar date={date} navigation={navigation} />
      </Content>
    </Container>
  )
}

const safe = { flex: 1, paddingTop: 10, paddingLeft: 20, paddingRight: 20 }

export default AppointmentDateScreen
