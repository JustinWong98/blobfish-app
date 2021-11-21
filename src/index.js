import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-miriam-libre';
// import {ContextProvider} from './SocketContext.js'

ReactDOM.render(
  <div>
    {/* <ContextProvider> */}
    <App />
    {/* </ContextProvider> */}
  </div>,
  document.getElementById('root')
);
