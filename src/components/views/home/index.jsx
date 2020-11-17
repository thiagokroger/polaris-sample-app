import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import TaskItem from 'components/molecules/task'
import Container from 'components/atoms/container'
import * as firebase from 'firebase'
import Button from 'components/molecules/addTaskButton'
import usePlatformNavigation from 'utils/hooks/usePlatformNavigation'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

const List = styled(ScrollView)`
  margin-bottom: 190px;
`

export const HomeScreen = ({ userId }) => {
  const { navigate } = usePlatformNavigation()
  const [list, setList] = useState([])

  useEffect(() => {
    firebase
      .database()
      .ref(userId)
      .on('value', snapshot => {
        const data = snapshot.val()
        setList(data || [])
      })
  }, [])

  const setDone = id => {
    const newList = list.map(val =>
      val.id === id ? { ...val, done: !val.done } : val
    )

    setList(newList)
    firebase.database().ref(userId).set(newList)
  }

  const sortList = (x, y) => {
    if (x.done === y.done) {
      const xDate = x.date.split(' ')
      const yDate = y.date.split(' ')
      if (xDate[1] === yDate[1]) {
        return xDate[0].replace('Q', '') - yDate[0].replace('Q', '')
      }
      return xDate[1] - yDate[1]
    }
    if (y.done) {
      return -1
    }
    return 1
  }

  return (
    <>
      <Container>
        <List>
          {list.sort(sortList).map(val => (
            <TaskItem key={val.id} {...val} setDone={() => setDone(val.id)} />
          ))}
        </List>
      </Container>
      <Button icon="add" trigger={() => navigate('/new')} />
    </>
  )
}

HomeScreen.propTypes = {
  userId: T.string
}
