import { registerApplication, start } from 'single-spa';

// // Configure import map for SystemJS
// const scriptElement = document.createElement('script');
// scriptElement.type = 'systemjs-importmap';
// scriptElement.textContent = JSON.stringify({
//   imports: {
//     'react': 'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
//     'react-dom': 'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js',
//     'single-spa': 'https://cdn.jsdelivr.net/npm/single-spa@5.9.5/lib/system/single-spa.min.js',
//     'single-spa-react': 'https://cdn.jsdelivr.net/npm/single-spa-react@5.1.4/lib/system/single-spa-react.min.js',
//     '@beyond/submission': '/beyond-submission.js'
//   }
// });
// document.head.appendChild(scriptElement);

// Load SystemJS
const systemJsScript = document.createElement('script');
systemJsScript.src = 'https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js';
document.head.appendChild(systemJsScript);

systemJsScript.onload = () => {
  registerApplication({
    name: "@beyond/submission",
    app: () => System.import('@beyond/submission'),
    activeWhen: ["/submission"]
  });

  start();
};