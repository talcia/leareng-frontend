import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
