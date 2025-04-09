import { Menu } from '@beyond/storage'

import { LazyExoticComponent, ComponentType } from 'react'
import { IFC } from '@beyond/layout'

export type SubmissionRouteProps = {
  menu: Menu
  component: LazyExoticComponent<ComponentType<any>> | IFC<any>
}

export interface ISubmissionRoute extends IFC<SubmissionRouteProps> {}