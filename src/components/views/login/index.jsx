import React, { useState } from 'react'
import T from 'prop-types'
import * as AuthSession from 'expo-auth-session'
import jwtDecode from 'jwt-decode'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Container from 'components/atoms/container'
import { Button } from 'react-native-elements'

const ErrorText = styled.Text`
  margin-top: 20px;
  color: red;
  text-align: center;
  font-weight: bold;
`

const Title = styled.Text`
  margin: 70px 0px 30px;
  text-align: center;
  font-size: 22px;
  color: #fff;
`

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = AuthSession.makeRedirectUri({ useProxy })

export const Login = ({ updateUser }) => {
  const [error, setError] = useState(null)

  // eslint-disable-next-line no-unused-vars
  const [req, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: 'm4gqxR2m6Fx0Cxux8udNXdKwKz0MRGw6',
      responseType: 'id_token',
      scopes: ['openid', 'profile'],
      extraParams: {
        nonce: 'nonce'
      }
    },
    { authorizationEndpoint: `https://dev-8g6u8za9.us.auth0.com/authorize` }
  )

  React.useEffect(() => {
    if (result) {
      if (result.error) {
        setError(result.params.error_description)
      }
      if (result.type === 'success') {
        const jwtToken = result.params.id_token
        const decoded = jwtDecode(jwtToken)
        updateUser(decoded)
      }
    }
  }, [result])

  return (
    <Container>
      <Title>Login</Title>

      <Button
        title="Login with Auth0"
        buttonStyle={{
          marginTop: 10,
          borderRadius: 4,
          padding: 14,
          backgroundColor: '#e65100'
        }}
        onPress={() => promptAsync({ useProxy, redirectUri })}
      />

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}

Login.propTypes = {
  updateUser: T.func.isRequired
}
