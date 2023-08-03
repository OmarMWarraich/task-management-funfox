import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskManager from './components/TaskManager';
import NavBar from './components/NavBar';
import Landing from './components/Landing';

function App() {
  return (
    <>
      <NavBar />
      <TaskManager />
      <ToastContainer />
    </>
  );
}

export default App;
