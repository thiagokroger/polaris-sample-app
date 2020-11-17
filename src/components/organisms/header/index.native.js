import React from 'react'
import T from 'prop-types'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header as NativeHeader } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { replaceParams } from 'utils/paths'
import usePlatformLocation from 'utils/hooks/usePlatformLocation'

const Left = ({ isHome, goBack, logout }) =>
  isHome ? (
    <TouchableOpacity onPress={logout}>
      <AntDesign name="logout" color="white" size={28} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={goBack}>
      <AntDesign name="arrowleft" color="white" size={28} />
    </TouchableOpacity>
  )

Left.propTypes = {
  isHome: T.bool,
  goBack: T.func,
  logout: T.func
}

const Right = ({ toggleDrawer }) => (
  <TouchableOpacity onPress={toggleDrawer}>
    <AntDesign name="bars" color="white" size={28} />
  </TouchableOpacity>
)

Right.propTypes = {
  toggleDrawer: T.func
}

const Header = ({ logout }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { currentRoute, params } = usePlatformLocation()
  const isHome = currentRoute.path === '/'
  const translatedName = t(currentRoute.name)
  const title = replaceParams(translatedName, params)

  return (
    <NativeHeader
      backgroundColor="#2b343b"
      leftComponent={
        <Left isHome={isHome} goBack={navigation.goBack} logout={logout} />
      }
      centerComponent={{
        text: title,
        style: {
          color: '#fff',
          fontSize: 21
        }
      }}
      rightComponent={<Right toggleDrawer={navigation.toggleDrawer} />}
    />
  )
}

Header.propTypes = {
  logout: T.func
}

export default Header
