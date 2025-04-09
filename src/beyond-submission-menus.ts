import { putMenuItem } from '@beyond/storage'
import { menus } from './shared/app.menus'

Promise.all(menus.map((menu) => putMenuItem(menu))).then()