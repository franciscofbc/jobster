import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Error, Landing, Register } from './pages';
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: 'all-jobs',
        element: <AllJobs />,
      },
      {
        path: 'add-job',
        element: <AddJob />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  { path: '/landing', element: <Landing />, errorElement: <Error /> },
  { path: '/register', element: <Register />, errorElement: <Error /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        style={{ textTransform: 'capitalize' }}
      />
    </>
  );
};

export default App;
