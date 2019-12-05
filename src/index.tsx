import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Auth0Provider } from 'use-auth0-hooks';
import { config } from './config';

const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider {...config.auth}>
      <ReduxProvider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ThemeProvider theme={theme()}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <Routes />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </ReduxProvider>
    </Auth0Provider>
  </BrowserRouter>,
  document.querySelector('#root')
);

serviceWorker.register();
