import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import { Provider } from 'react-redux';  
import store from './store.js'
document.getElementById("appstart").style.display = 'none';
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));