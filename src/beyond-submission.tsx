import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';
import './index.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err: Error, info: React.ErrorInfo) {
    return (
      <div className="error-boundary p-4 bg-destructive text-destructive-foreground rounded-md">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p className="mb-2">{err.message}</p>
        <pre className="text-sm overflow-auto">
          {info.componentStack}
        </pre>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;