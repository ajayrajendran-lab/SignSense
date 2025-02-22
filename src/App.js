import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'

import Performer from './pages/Performer';
import Speaker from './pages/Speaker';
import HomePage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },{
    path: '/Performer',
    element: <Performer />
  },{
    path: '/Speaker',
    element: <Speaker />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;

