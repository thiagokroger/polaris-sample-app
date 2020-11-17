import React, { useState } from 'react'
import { YellowBox } from 'react-native'
import Route from 'components/templates/route'
import { ThemeProvider } from 'store'
import 'services/i18n'

YellowBox.ignoreWarnings([
  'Animated',
  'Warning: componentWill',
  'Possible Unhandled Promise'
])

const App = () => {
  const [user, setUser] = useState(null)

  const updateUser = user => {
    setUser({ ...user })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <ThemeProvider>
      <Route
        userId={user?.sub}
        isAuthenticated={!!user}
        updateUser={updateUser}
        logout={logout}
      />
    </ThemeProvider>
  )
}

export default App
