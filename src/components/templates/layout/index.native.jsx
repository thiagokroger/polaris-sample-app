import React from 'react'
import T from 'prop-types'
import styled from 'styled-components/native'
import Header from 'components/organisms/header'

const Screen = styled.View`
  overflow: hidden;
  width: 100%;
  height: 100%;
`

const Page = styled.View`
  flex: 1;
  background-color: white;
  padding-bottom: 0;
`

const LayoutBase = ({ children, hasMenu, logout }) => {
  return (
    <Screen>
      <Page>
        {hasMenu && <Header logout={logout} />}
        {children}
      </Page>
    </Screen>
  )
}

LayoutBase.propTypes = {
  children: T.node,
  hasMenu: T.bool,
  logout: T.func
}

export default LayoutBase
