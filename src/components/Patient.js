import React from 'react'
import styled from 'styled-components/native'

import GrayText from './GrayText'
/* import Badge from './Badge' */
import Ava from './Ava'
import { phoneFormat } from '../../utils'

const Patient = ({ navigation, item }) => {
	return (
		<GroupItem
			onPress={() =>
				navigation.navigate('Patient', {
					userName: item.fullName,
					userPhone: item.phone,
					userEmail: item.email,
					patientId: item._id,
				})
			}
		>
			<Ava item={item} />
			<GroupDesc>
				<FullName>{item.fullName}</FullName>
				<GrayText>{phoneFormat(item.phone)}</GrayText>
			</GroupDesc>
			{/* <Badge active={active}>{time}</Badge> */}
			<GroupTime>
				<TimeText>{item.gender[0].toUpperCase()}</TimeText>
			</GroupTime>
		</GroupItem>
	)
}

Patient.defaultProps = {
	title: 'Untitled',
	items: [],
}

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

const GroupItem = styled.TouchableOpacity({
	flexDirection: 'row',
	alignItems: 'center',
	paddingBottom: '20px',
	paddingTop: '20px',
	borderBottomWidth: '1px',
	borderBottomColor: '#F3F3F3',
})

export default Patient
