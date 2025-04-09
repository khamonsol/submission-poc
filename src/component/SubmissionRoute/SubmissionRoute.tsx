import { PrivateRoute } from '@beyond/layout'
import { useMatches } from 'react-router-dom'
import { ISubmissionRoute, SubmissionRouteProps } from '@/component/SubmissionRoute/types'


export const SubmissionRoute: ISubmissionRoute = (
  props: SubmissionRouteProps
) => {
  const { menu, component: Component } = props

  const matches = useMatches()

  return (
    <PrivateRoute
      matches={matches}
      path={menu.route}
      minAccessRole={menu.roles}
    >
      <Component />
    </PrivateRoute>
  )
}