import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskManager from './components/TaskManager';
import NavBar from './components/NavBar';
import NotificationComponent from './components/NotificationComponent';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <NavBar />
      <TaskManager />
      <NotificationComponent />
      <ToastContainer />
    </DndProvider>
  );
}

export default App;
