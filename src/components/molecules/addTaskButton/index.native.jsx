import React from 'react'
import styled from 'styled-components/native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const Container = styled.TouchableOpacity`
  background-color: #03bcd4;
  position: absolute;
  height: 80px;
  bottom: 25px;
  right: 10px;
  width: 80px;
  z-index: 1;
  shadow-offset: 0 2px;
  shadow-radius: 2px;
  shadow-opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`

const Button = ({ icon, trigger }) => {
  return (
    <Container onPress={trigger}>
      <Icon name={icon} />
    </Container>
  )
}

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  trigger: PropTypes.func.isRequired
}

export default Button
