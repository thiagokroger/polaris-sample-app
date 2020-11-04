import * as React from 'react'
import Container from 'components/atoms/container'
import { Input, ButtonGroup, Button, Icon } from 'react-native-elements'
import styled from 'styled-components/native'
import AddButton from 'components/molecules/addTaskButton'
import * as firebase from 'firebase'
import usePlatformNavigation from 'utils/hooks/usePlatformNavigation'

const Label = styled.Text`
  padding: 5px;
  color: #9ca7b0;
  font-weight: bold;
`

const Row = styled.View`
  padding: ${props => props.padding || '0px'};
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: center;
`

export const NewTask = () => {
  const { navigate } = usePlatformNavigation()
  const [list, setList] = React.useState([])
  const [currentLink, setCurrentLink] = React.useState(null)

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

  const [task, setTask] = React.useState({
    name: '',
    quarter: 'Q1',
    year: '',
    links: []
  })

  React.useEffect(() => {
    firebase
      .database()
      .ref('/tasks')
      .on('value', snapshot => {
        const data = snapshot.val()
        setList(data || [])
      })
  }, [])

  const save = async () => {
    if (!task.name || !task.year) {
      return
    }

    const newData = [
      ...list,
      {
        id: list.length,
        name: task.name,
        date: `${task.quarter} ${task.year}`,
        links: task.links || [],
        done: false
      }
    ]

    firebase.database().ref('/tasks').set(newData)

    await setTask({ name: '', quarter: 'Q1', year: '', links: [] })
    navigate('/')
  }

  return (
    <>
      <Container>
        <Input
          inputStyle={{ color: 'white' }}
          label="Name"
          value={task.name}
          onChangeText={val => setTask(prev => ({ ...prev, name: val }))}
        />

        <Label>Quarter</Label>
        <ButtonGroup
          onPress={i => setTask(prev => ({ ...prev, quarter: quarters[i] }))}
          selectedIndex={quarters.findIndex(val => val === task.quarter)}
          buttons={quarters}
          containerStyle={{
            backgroundColor: '#2b343b',
            borderColor: '#2b343b',
            marginBottom: '5%'
          }}
          selectedButtonStyle={{ backgroundColor: '#03bcd4' }}
        />

        <Input
          maxLength="4"
          keyboardType="numeric"
          inputStyle={{ color: 'white' }}
          label="Year"
          value={task.year}
          onChangeText={val => setTask(prev => ({ ...prev, year: val }))}
        />

        <Row>
          <Button
            title="+"
            buttonStyle={{ width: 50, backgroundColor: '#03bcd4' }}
            disabled={!currentLink}
            onPress={() => {
              setTask(prev => ({
                ...prev,
                links: [...prev.links, currentLink]
              }))
              setCurrentLink(null)
            }}
          />
          <Input
            keyboardType="url"
            inputStyle={{ color: 'white' }}
            inputContainerStyle={{ width: '85%' }}
            label="Link"
            value={currentLink}
            onChangeText={val => setCurrentLink(val)}
          />
        </Row>

        {task.links.map((link, i) => (
          <Row justify="space-between" padding="2%" key={i}>
            <Label>{link}</Label>
            <Icon
              name="close"
              color="#9ca7b0"
              onPress={() =>
                setTask(prev => ({
                  ...prev,
                  links: prev.links.filter(val => val !== link)
                }))
              }
            />
          </Row>
        ))}
      </Container>
      <AddButton icon="done" trigger={() => save()} />
    </>
  )
}
