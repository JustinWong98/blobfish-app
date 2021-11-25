import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-miriam-libre';
// import {ContextProvider} from './SocketContext.js'
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3002';

ReactDOM.render(
  <div>
    {/* <ContextProvider> */}
    <App />
    {/* </ContextProvider> */}
  </div>,
  document.getElementById('root')
);
