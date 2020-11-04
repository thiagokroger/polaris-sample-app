import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'styled-components'

import {
  within,
  fireEvent,
  cleanup,
  renderAsRoute
} from '../../../molecules/addTaskButton/__tests__/node_modules/utils/test-utils'
import Navigation from '..'

afterEach(cleanup)

const ThemeSwitchFixture = () => {
  const theme = useTheme()
  return (
    <View>
      <Navigation />
      <Text>Theme: {theme.name}</Text>
    </View>
  )
}

describe('Navigation Header Web', () => {
  it('should change theme correctly on press', async () => {
    const { getByTestId, queryAllByText } = renderAsRoute(
      <ThemeSwitchFixture />
    )

    expect(queryAllByText('Theme: light')).toHaveLength(1)
    expect(queryAllByText('Theme: dark')).toHaveLength(0)

    const themeSwitch = within(getByTestId('theme-switch')).getByRole(
      'checkbox'
    )

    await fireEvent.click(themeSwitch)

    expect(queryAllByText('Theme: light')).toHaveLength(0)
    expect(queryAllByText('Theme: dark')).toHaveLength(1)
  })
})
