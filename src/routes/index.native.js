import { Camera, CameraRow } from 'components/views'

import routes, { defaultPath, routeShape } from './index.common'

const nativeOnlyRoutes = [
  { path: '/camera', View: Camera, name: 'camera:title', menuIndex: 2 },
  {
    path: '/camera-row',
    View: CameraRow,
    name: 'cameraRow:title',
    menuIndex: 3
  }
]

export default [...routes, ...nativeOnlyRoutes]
export { defaultPath, routeShape }
