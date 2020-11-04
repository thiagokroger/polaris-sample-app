import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { CheckBox } from 'react-native-elements'

const Container = styled.TouchableOpacity`
  padding: 5px;
  background-color: #2b343b;
  margin: 5px;
`

const Row = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #2b343b;
  margin: 5px;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: center;
`

const Item = styled.Text`
  font-size: 18px;
  color: #fff;
`

const LinkList = styled.View`
  padding-top: 14px;
`

const LinkItem = styled.Text`
  padding: 4px;
  font-size: 16px;
  color: #fff;
`

const TaskItem = ({ id, name, date, done, links, setDone }) => {
  const [linksListOpen, setLinksListOpen] = React.useState(false)

  return (
    <Container onPress={() => setLinksListOpen(!linksListOpen)}>
      <Row>
        <CheckBox
          uncheckedcon="circle-o"
          checked={done}
          onPress={() => setDone(!done)}
        />
        <Item>{name}</Item>
      </Row>

      <Row justify="space-between">
        <Item>{links?.length || 0} links</Item>
        <Item>{date}</Item>
      </Row>

      {linksListOpen && links && (
        <LinkList>
          {links.map(link => (
            <LinkItem key={link}>{link}</LinkItem>
          ))}
        </LinkList>
      )}
    </Container>
  )
}

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  links: PropTypes.array.isRequired,
  setDone: PropTypes.func.isRequired
}

export default TaskItem
