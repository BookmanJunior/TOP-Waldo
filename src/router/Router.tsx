import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Map from '../components/Map';
import ErrorElement from './ErrorElement';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'play/:map_id',
          element: <Map />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
