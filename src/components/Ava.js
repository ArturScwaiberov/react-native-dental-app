import React from 'react'
import styled from 'styled-components/native'
import getAvatartColor from '../../utils/getAvatartColor'

const Ava = ({ item }) => {
	if (item.avatar) {
		return <Avatar source={{ uri: item.avatar }} />
	} else {
		const firstLetter = item.fullName[0].toUpperCase()
		const avatarColors = getAvatartColor(firstLetter)
		return (
			<FirstLetterHandler style={{ backgroundColor: avatarColors.background }}>
				<FirstLetter style={{ color: avatarColors.color }}>{firstLetter}</FirstLetter>
			</FirstLetterHandler>
		)
	}
}

const FirstLetter = styled.Text({
	fontSize: '26px',
	fontWeight: 'bold',
	marginLeft: 1,
})

const FirstLetterHandler = styled.View({
	borderRadius: '50px',
	height: '40px',
	width: '40px',
	marginRight: '15px',
	justifyContent: 'center',
	alignItems: 'center',
})

const Avatar = styled.Image({
	borderRadius: '50px',
	height: '40px',
	width: '40px',
	marginRight: '15px',
})

export default Ava
