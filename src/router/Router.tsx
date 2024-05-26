import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from './Home';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
