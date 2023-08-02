import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskManager from './components/TaskManager';
import NavBar from './components/NavBar';
import NotificationComponent from './components/NotificationComponent';

function App() {
  return (
    <>
      <NavBar />
      <TaskManager />
      <NotificationComponent />
      <ToastContainer />
    </>
  );
}

export default App;
