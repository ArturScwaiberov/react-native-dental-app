import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Animated, Platform, ActivityIndicator, RefreshControl, Linking, Alert } from 'react-native'
import styled from 'styled-components'
import { Foundation, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

import { GrayText, Button, Badge } from '../src/components'
import { patientsApi, phoneFormat, appointmentsApi } from '../utils'

const PatientScreen = ({ route, navigation }) => {
  const { patientId, userName, userPhone, userEmail, description } = route.params
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
  const AnimatedGrayText = Animated.createAnimatedComponent(GrayText)

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

  const deletePatientsAppointment = (appointmentId) => {
    setIsLoading(true)
    appointmentsApi
      .remove(appointmentId)
      .then(() => {
        fetchPatientsAppointments()
      })
      .catch((error) => {
        error.request ? console.log(error.request) : console.log('Error', error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      fetchPatientsAppointments()
    }
    return () => (mounted = false)
  }, [])

  const EmailRow = () => {
    if (userEmail) {
      return <GrayText style={{ marginBottom: 20 }}>{userEmail}</GrayText>
    } else {
      return null
    }
  }

  const HEADER_HEIGHT = userEmail ? 204 : 165
  const TITLE_HEIGHT = HEADER_HEIGHT + 30

  let translateY = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT * 0.7],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  })

  let translateYN = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT * 0.7],
    outputRange: [0, -HEADER_HEIGHT + 30],
    extrapolate: 'clamp',
  })

  const pressHandler = () => {
    navigation.navigate('ToothFormula', appointments)
  }

  const createOneButtonAlert = (appId) => {
    Alert.alert(
      'Внимание',
      'Прием будет удален, отменить действие будет невозможно',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', onPress: () => deletePatientsAppointment(appId) },
      ],
      { cancelable: true }
    )
  }

  return (
    <Container>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: HEADER_HEIGHT,
            zIndex: 1000,
            paddingLeft: 20,
            paddingRight: 20,
          },
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <PatientFullName>{userName}</PatientFullName>
        <GrayText style={{ marginBottom: 10 }}>{phoneFormat(userPhone)}</GrayText>
        <EmailRow />
        <ButtonsWrapper>
          <Button onPress={pressHandler}>Формула зубов</Button>
          <CallButton onPress={() => Linking.openURL('tel:+' + userPhone)}>
            <Foundation
              style={{ marginTop: Platform.OS === 'ios' ? 2 : 0 }}
              name='telephone'
              size={30}
              color='white'
            />
          </CallButton>
        </ButtonsWrapper>
      </Animated.View>

      <PatientAppointments>
        <AnimatedGrayText
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              top: HEADER_HEIGHT - 40,
              backgroundColor: '#f8fafd',
              zIndex: 1000,
              marginLeft: 20,
              marginRight: 20,
              paddingTop: 28,
              paddingBottom: 16,
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
            },
            {
              transform: [{ translateY: translateYN }],
            },
          ]}
        >
          {appointments.length > 0
            ? `Приемы (${appointments.length})`
            : `У пациента ${userName} ещё нет приемов`}
        </AnimatedGrayText>
        {isLoading ? (
          <ActivityIndicator size='small' />
        ) : (
          <Animated.FlatList
            data={appointments}
            keyExtractor={(item) => item._id}
            scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
              { useNativeDriver: true } // <-- Add this
            )}
            style={{
              paddingTop: TITLE_HEIGHT,
              paddingRight: 20,
              paddingLeft: 20,
            }}
            contentContainerStyle={{ paddingBottom: TITLE_HEIGHT, flexGrow: 1 }}
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
                <ButtonsHolder>
                  <DeleteButton onPress={() => createOneButtonAlert(item._id)}>
                    <Ionicons name='ios-trash' size={30} color='red' />
                  </DeleteButton>
                </ButtonsHolder>
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
                  <Ionicons
                    style={{ marginRight: 7 }}
                    name='md-document'
                    size={20}
                    color='#A3A3A3'
                  />
                  <AppointmentCardLabel>
                    Описание: <Bold>{item.description}</Bold>
                  </AppointmentCardLabel>
                </AppointmentCardRow>

                <AppointmentCardRow>
                  <ButtonsWrapper style={{ flex: 1 }}>
                    <Badge>
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

const ButtonsHolder = styled.View({
  flexDirection: 'row',
  position: 'absolute',
  right: 0,
  top: 0,
})

const DeleteButton = styled.TouchableOpacity({
  borderTopRightRadius: 4,
  borderBottomLeftRadius: 4,
  width: 44,
  height: 44,
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
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
  flex: 1,
  flexWrap: 'wrap',
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
