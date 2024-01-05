import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {MetaMaskProvider} from '@metamask/sdk-react';
import { createRoot } from 'react-dom/client';
const  container = document.getElementById('root');
const root = createRoot(container);

root.render(
<MetaMaskProvider debug={false} sdkOptions={{
    dappMetadata: {
      name: 'Leetcode Daily',
      description: 'A dapp to help you keep track of your daily leetcode progress',
      url: window.location.host,
      icons: [],
    },
  }}>
    <App />
  </MetaMaskProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
