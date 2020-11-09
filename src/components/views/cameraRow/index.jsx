import React, { useState } from 'react'
import * as firebase from 'firebase'
import T from 'prop-types'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import Container from 'components/atoms/container'

const ImageContainer = styled.Image`
  margin: 1%;
  height: 160px;
  width: 48%;
`

const ImageItem = ({ item }) => (
  <ImageContainer
    source={{
      uri: item.url
    }}
  />
)

export const CameraRow = () => {
  const [images, setImages] = useState([])

  React.useEffect(() => {
    firebase
      .storage()
      .ref('images')
      .list()
      .then(async res => {
        const data = res.items
        const urls = await Promise.all(
          data.map(async (val, i) => {
            const url = await val.getDownloadURL().then(url => url)
            return { url, id: i }
          })
        )
        setImages(urls)
      })
      .catch(err => console.log('err', err))
  }, [])

  return (
    <Container>
      <FlatList
        data={images}
        renderItem={ImageItem}
        numColumns={2}
        style={{ marginBottom: '20%' }}
      />
    </Container>
  )
}

ImageItem.propTypes = {
  item: {
    url: T.string
  }
}
