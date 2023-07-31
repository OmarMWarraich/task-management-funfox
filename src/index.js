import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import './index.css';
import App from './App';
import dataReducer from './reducers/dataSlice';
import groupsReducer from './reducers/groupsSlice';
import tasksReducer from './reducers/tasksSlice';
import usersReducer from './reducers/usersSlice';

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
      <App />
    </Provider>
  </React.StrictMode>,
);
