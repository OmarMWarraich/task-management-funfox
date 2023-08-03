import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import dataReducer from './reducers/dataSlice';
import groupsReducer from './reducers/groupsSlice';
import tasksReducer from './reducers/tasksSlice';
import usersReducer from './reducers/usersSlice';
import Auth0ProviderWithHistory from './utils/auth/auth0-provider-with-history';

import './index.css';

const rootReducer = combineReducers({
  data: dataReducer,
  groups: groupsReducer,
  tasks: tasksReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </Router>
    </Provider>
  </React.StrictMode>,
);
