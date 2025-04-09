import React from 'react'
import ReactDOMClient from 'react-dom/client'

import singleSpaReact from 'single-spa-react'
import Root from './root.component'
import { GlobalError } from '@beyond/layout'
import './index.css'

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  //@ts-expect-error because the linter told me to
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err: Error, info: React.ErrorInfo, props: any) {
    console.log(`Error: ${err}`)
    console.log(`Info: ${info}`)
    console.log(`Props: ${props}`)

    return <GlobalError errorMessage={`${err}`} info={`${info}`} />
  },
})