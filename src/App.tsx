import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './routes/Home';
import Users from './routes/Users';
import Products from './routes/Products';
import { AppProvider } from './AppContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

function App() {
  return (
    <div className='neutra-text font-normal m-5 text-as-black'>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
    </div>
  )
}

export default App
