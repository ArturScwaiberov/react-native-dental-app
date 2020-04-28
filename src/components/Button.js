import React from 'react'
import styled from 'styled-components'

const Button = ({ children }) => {
	return (
		<FormulaButton onPress={() => alert('hello')}>
			<FormulaButtonText>{children}</FormulaButtonText>
		</FormulaButton>
	)
}

const FormulaButton = styled.TouchableOpacity({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '40px',
	height: '45px',
	backgroundColor: '#2A86FF',
})

const FormulaButtonText = styled.Text({
	color: '#fff',
	fontSize: 16,
})

export default Button
