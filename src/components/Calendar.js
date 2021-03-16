import React, { useEffect, useState } from 'react'
import { Text } from 'native-base'
import styled from 'styled-components/native'
import { addDays, endOfMonth, format, getDate, startOfMonth, startOfWeek } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { View } from 'react-native'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const getWeekDays = (date) => {
  const startDateOfMonth = startOfMonth(date, { weekStartsOn: 1 })
  const endDayNumberOfMonth = format(endOfMonth(date), 'd')

  const final = []

  /* нужно от нуля идти до последнего числа месяца, 
  после этого по циклу проходить по каждой неделе от начала недели и до ее конца 
  и все это пихать в фильный массив как отдельные объекты */
  for (let i = 0; i < endDayNumberOfMonth; i++) {
    const allDatesInMonth = addDays(startDateOfMonth, i)

    final.push({
      id: i,
      formatted: format(allDatesInMonth, 'EEE', { locale: ruLocale }),
      date: allDatesInMonth,
      day: getDate(allDatesInMonth),
    })
  }

  return final
}

const Calendar = ({ date, navigation }) => {
  const currentDayNumber = format(date, 'd')
  const [week, setWeek] = useState([])
  const [isChoosed, setIsChoosed] = useState('')
  const times = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
  ]

  useEffect(() => {
    const weekDays = getWeekDays(date)
    setWeek(weekDays)
  }, [date])

  const daysNames = Object.entries(week)
    .slice(0, 7)
    .map((entry) => entry[1])

  return (
    <View>
      <ContentHolder>
        <H1>Февраль</H1>
        <H5>2021</H5>
      </ContentHolder>
      <Container>
        {daysNames.map((dayName) => {
          return (
            <Week key={dayName.formatted}>
              <View style={{ paddingVertical: 5 }}>
                <DayText>{dayName.formatted[0].toUpperCase() + dayName.formatted.slice(1)}</DayText>
              </View>
            </Week>
          )
        })}
      </Container>

      <Container>
        {week.map((weekDay) => {
          return (
            <Week key={weekDay.day + weekDay.formatted}>
              <DayButton
                style={
                  currentDayNumber - 1 > weekDay.id
                    ? dayButtonClosed
                    : weekDay.id + 1 === isChoosed
                    ? dayButtonActivated
                    : weekDay.id % 3 === 0
                    ? dayButtonActive
                    : null
                }
                onPress={() => setIsChoosed(weekDay.id + 1)}
              >
                <NumberText
                  style={
                    currentDayNumber - 1 > weekDay.id
                      ? numberTextClosed
                      : weekDay.id + 1 === isChoosed
                      ? numberTextActivated
                      : weekDay.id % 3 === 0
                      ? numberTextActive
                      : null
                  }
                >
                  {weekDay.day}
                </NumberText>
              </DayButton>
            </Week>
          )
        })}
      </Container>

      <RoundsHolderTimes>
        <H5 style={{ alignSelf: 'center', margin: 5 }}>Выберите удобное время</H5>
        <RoundsRowHolderTimes>
          {times.map((time) => {
            return (
              <RoundTime onPress={() => navigation.navigate('ConfirmAppointmentScreen')} key={time}>
                <H5Active>{time}</H5Active>
              </RoundTime>
            )
          })}
        </RoundsRowHolderTimes>
      </RoundsHolderTimes>

      <RoundsHolder>
        <RoundsRowHolder>
          <RoundClosed />
          <H5>Не рабочий день</H5>
        </RoundsRowHolder>
        <RoundsRowHolder>
          <RoundNoApp />
          <H5>Рабочий день, записи нет</H5>
        </RoundsRowHolder>
        <RoundsRowHolder>
          <RoundApp />
          <H5>Рабочий день, запись есть</H5>
        </RoundsRowHolder>
      </RoundsHolder>
    </View>
  )
}

const Container = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  flex: 1,
})

const ContentHolder = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  marginBottom: 10,
})

const RoundsHolder = styled.View({
  marginTop: 15,
  marginLeft: 5,
  marginBottom: 20,
})

const RoundsHolderTimes = styled.View({
  marginTop: 5,
  paddingTop: 5,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  flex: 1,
})

const RoundsRowHolder = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 7,
})

const RoundsRowHolderTimes = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginBottom: 7,
  flex: 1,
  flexWrap: 'wrap',
})

const RoundClosed = styled.View({
  height: 13,
  width: 13,
  borderRadius: 13,
  backgroundColor: '#ccc',
  marginRight: 7,
})

const RoundTime = styled.TouchableOpacity({
  borderRadius: 13,
  margin: 4,
  padding: 8,
  borderWidth: 1,
  borderColor: '#84D269',
  flexBasis: '20%',
  justifyContent: 'center',
  alignItems: 'center',
})

const RoundNoApp = styled.View({
  height: 13,
  width: 13,
  borderRadius: 13,
  backgroundColor: '#ecf0d8',
  marginRight: 7,
})

const RoundApp = styled.View({
  height: 13,
  width: 13,
  borderRadius: 13,
  backgroundColor: '#ff695e',
  marginRight: 7,
})

const Week = styled.View({
  flexBasis: '14%',
  justifyContent: 'center',
  alignItems: 'center',
})

const DayText = styled.Text({
  color: '#555',
})

const DayButton = styled.TouchableOpacity({
  backgroundColor: '#ecf0d8',
  padding: 4,
  marginVertical: 7,
  borderRadius: 10,
  width: 33,
  height: 33,
  justifyContent: 'center',
  alignItems: 'center',
})

const dayButtonActive = {
  backgroundColor: '#ff695e',
}

const dayButtonActivated = {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#555',
}

const dayButtonClosed = {
  backgroundColor: '#fff',
}

const NumberText = styled.Text({
  fontSize: 16,
  color: '#555',
})

const numberTextActive = {
  color: 'white',
}

const numberTextActivated = {
  color: '#555',
}

const numberTextClosed = {
  color: '#ccc',
}

const H1 = styled.Text({
  fontSize: 28,
  color: '#333',
})

const H5 = styled.Text({
  fontSize: 14,
  color: '#555',
})

const H5Active = styled.Text({
  fontSize: 14,
  color: '#08cf4a',
  fontFamily: 'Roboto_medium',
})

export default Calendar
