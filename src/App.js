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
  return <RouterProvider router={router} />;
};

export default App;
