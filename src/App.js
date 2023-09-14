import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, Error, Landing, Register } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'landing', element: <Landing /> },
      { path: 'register', element: <Register /> },
    ],
  },
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
