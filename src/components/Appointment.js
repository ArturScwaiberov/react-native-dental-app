import React from 'react'
import styled from 'styled-components/native'

import GrayText from './GrayText'
import Badge from './Badge'

const Appointment = ({ navigation, item }) => {
	const { user, diagnosis, active, time } = item
	return (
		<GroupItem
			onPress={() =>
				navigation.navigate('Patient', {
					userName: user.fullName,
					userPhone: user.phone,
				})
			}
		>
			<Avatar source={{ uri: user.avatar }} />
			<GroupDesc>
				<FullName>{user.fullName}</FullName>
				<GrayText>{diagnosis}</GrayText>
			</GroupDesc>
			{/* <Badge active={active}>{time}</Badge> */}
			<GroupTime active={active}>
				<TimeText active={active}>{time}</TimeText>
			</GroupTime>
		</GroupItem>
	)
}

Appointment.defaultProps = {
	title: 'Untitled',
	items: [],
}

/* const GroupDate = styled.Text`
	color: ${(props) => (props.active ? '#FFF' : '#4294FF')};
	background: ${(props) => (props.active ? '#2A86FF' : '#E9F5FF')};
	border-color: ${(props) => (props.active ? '#2A86FF' : '#E9F5FF')};
	border-width: 1px;
	border-radius: 16px;
	overflow: hidden;
	font-size: 14px;
	width: 70px;
	height: 32px;
	text-align: center;
	line-height: 30px;
` */

const TimeText = styled.Text`
	color: ${(props) => (props.active ? '#FFF' : '#4294FF')};
	font-size: 14px;
	font-weight: 600;
`

const GroupTime = styled.View`
	background: ${(props) => (props.active ? '#2A86FF' : '#E9F5FF')};
	border-radius: 18px;
	justify-content: center;
	align-items: center;
	width: 70px;
	height: 32px;
`

const GroupDesc = styled.View({
	flex: 1,
})

const FullName = styled.Text({
	fontSize: '16px',
	fontWeight: 600,
})

const Avatar = styled.Image({
	borderRadius: '50px',
	height: '40px',
	width: '40px',
	marginRight: '15px',
})

const GroupItem = styled.TouchableOpacity({
	flexDirection: 'row',
	alignItems: 'center',
	paddingBottom: '20px',
	paddingTop: '20px',
	borderBottomWidth: '1px',
	borderBottomColor: '#F3F3F3',
})

export default Appointment
