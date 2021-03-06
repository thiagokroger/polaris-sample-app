import T from 'prop-types'
import { HomeScreen, NewTask, Login } from 'components/views'

const routes = [
  {
    path: '/login',
    View: Login,
    menuIndex: 0,
    name: 'Login',
    loginRoute: true
  },
  { path: '/', View: HomeScreen, menuIndex: 0, name: 'home:title' },
  { path: '/new', View: NewTask, menuIndex: 1, name: 'newTask:title' },
  { path: '/index.html', redirectTo: '/' }
]

const defaultPath = routes[0].path

const routeShape = T.shape({
  path: T.string.isRequired,
  View: T.elementType,
  menuIndex: T.number,
  name: T.string
})

export default routes
export { defaultPath, routeShape }
