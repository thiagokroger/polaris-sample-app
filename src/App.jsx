import React from 'react'
import { YellowBox } from 'react-native'
import Route from 'components/templates/route'
import { ThemeProvider } from 'store'
import 'services/i18n' // Attaches appropriate i18n object to react-i18n
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAqtKrQQFa7b5Zr7AKMbM0yuS8C6f7g97c',
  authDomain: 'study-todo-list.firebaseapp.com',
  databaseURL: 'https://study-todo-list.firebaseio.com',
  projectId: 'study-todo-list',
  storageBucket: 'study-todo-list.appspot.com',
  messagingSenderId: '25893593139',
  appId: '1:25893593139:web:89f72ebc8e3fdd8d704346',
  measurementId: 'G-7PLSRFJSHZ'
}

firebase.initializeApp(firebaseConfig)

// Mute multiple known warnings to display on device. Those warning messages coming from React Native components and need to be fixed by RN team
YellowBox.ignoreWarnings([
  'Animated',
  'Warning: componentWill',
  'Possible Unhandled Promise'
])

const App = () => (
  <ThemeProvider>
    <Route />
  </ThemeProvider>
)

export default App
