import * as React from 'react'
import T from 'prop-types'
import { View, Text } from 'react-native'
import { Camera as ExpoCamera } from 'expo-camera'
import * as firebase from 'firebase'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import Container from 'components/atoms/container'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Wrapper = styled.View`
  flex: 1;
`

const TakePictureButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  background-color: #fff;
  height: 70px;
  width: 70px;
  z-index: 1;
  shadow-offset: 0 2px;
  shadow-radius: 2px;
  shadow-opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  align-self: center;
`

const PhotoButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #2b343b;
  height: 20%;
`

const PhotoActionButton = styled.Text`
  padding: 20px 50px;
  color: #fff;
  font-size: 20px;
`

const ImageContainer = styled.Image`
  height: 90%;
  width: 100%;
`

export const Camera = ({ userId }) => {
  const { t } = useTranslation()
  const [hasPermission, setHasPermission] = React.useState(null)
  const [photo, setPhoto] = React.useState(null)
  const camera = React.createRef()

  const takePicture = async () => {
    try {
      const photo = await camera.current.takePictureAsync()
      setPhoto(photo)
    } catch (err) {
      console.log('Error while taking picture', err)
    }
  }

  const uploadImage = async () => {
    const fileSplited = photo.uri.split('/')
    const title = fileSplited[fileSplited.length - 1].replace('.jpg', '')

    const response = await fetch(photo.uri)
    const blob = await response.blob()

    const ref = firebase.storage().ref(userId).child(title)
    await ref
      .put(blob)
      .then(() => {
        alert('Picture uploaded with sucess!')
        setPhoto(null)
      })
      .catch(err => alert(err.message))
  }

  React.useEffect(() => {
    ;(async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return (
      <Container>
        <Text>{t('camera:permissionDenied')}</Text>
      </Container>
    )
  }

  return !photo ? (
    <Wrapper>
      <ExpoCamera style={{ flex: 1 }} ref={camera}>
        <TakePictureButton onPress={takePicture}>
          <Icon name="camera-alt" />
        </TakePictureButton>
      </ExpoCamera>
    </Wrapper>
  ) : (
    <Wrapper>
      <ImageContainer
        source={{ uri: photo.uri }}
        style={{ height: '90%', width: '100%' }}
      />
      <PhotoButtons>
        <TouchableOpacity onPress={() => setPhoto(null)}>
          <PhotoActionButton>re-take</PhotoActionButton>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage}>
          <PhotoActionButton>upload photo</PhotoActionButton>
        </TouchableOpacity>
      </PhotoButtons>
    </Wrapper>
  )
}

Camera.propTypes = {
  userId: T.string
}
