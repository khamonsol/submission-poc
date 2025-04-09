import { lazy } from 'react'
import {
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { menus } from './shared/app.menus'
import { routeImport } from './shared/app.route-imports'
import { SubmissionRoute } from './component/SubmissionRoute/SubmissionRoute'
import { GlobalError } from '@beyond/layout'

const Root = () => {
  const createRoutes = () => {
    return createBrowserRouter(
      menus.map((menu) => {
        const component = lazy(() => routeImport(menu.name))
        const routeObject: RouteObject = {
          path: menu.route,
          element: <SubmissionRoute menu={menu} component={component} />,
          handle: {
            crumb: () => <span>{menu.name}</span>,
          },
          errorElement: <GlobalError />,
        }
        return routeObject
      })
    )
  }

  const routes = createRoutes()

  return <RouterProvider router={routes} />
}

export default Root