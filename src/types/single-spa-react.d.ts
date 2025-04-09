declare module 'single-spa-react' {
  import type { ComponentType, ErrorInfo } from 'react';
  
  interface SingleSpaReactOpts {
    React: any;
    ReactDOM: any;
    rootComponent: ComponentType<any>;
    errorBoundary?: (error: Error, errorInfo: ErrorInfo, props: any) => JSX.Element;
  }

  interface LifeCycles {
    bootstrap: (props: any) => Promise<void>;
    mount: (props: any) => Promise<void>;
    unmount: (props: any) => Promise<void>;
  }

  export default function singleSpaReact(opts: SingleSpaReactOpts): LifeCycles;
}