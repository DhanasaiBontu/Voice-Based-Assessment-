import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import TeacherLogin from './components/TeacherLogin';
import Home from './components/Home';
import TakeTest from './components/TakeTest';
import StudentWelcome from './components/StudentWelcome';
import StudentDetails from './components/StudentDetails';
import ViewResults from './components/ViewResults';
import Root from './components/Root';
import Root2 from './components/Root2';
import Progress from './components/Progress';
import CreateAssignment from './components/CreateAssignment';
import AssignmentsList from './components/AssignmentsList';
import Profile from './components/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StudentLogin />,
  },
  {
    path: '/teacher-login',
    element: <TeacherLogin />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      { path: '/home', element: <StudentWelcome /> },
      { path: '/home/progress', element: <Progress /> },
      { path: '/home/assignments', element: <AssignmentsList /> },
      { path: '/home/profile', element: <Profile /> },
    ],
  },
  {
    path: '/teacher/student-details',
    element: <StudentDetails />,
  },
  {
    path: '/teacher/create-assignment',
    element: <CreateAssignment />,
  },
  {
    path: '/test',
    element: <TakeTest />,
  },
  {
    path: '/results',
    element: <ViewResults />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;