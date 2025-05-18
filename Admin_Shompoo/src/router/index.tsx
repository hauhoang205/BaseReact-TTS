
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from '../components/layout/AdminLayout';
import Product from './../pages/Product/Product';

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      {
        index: true,         
        element: <Product />,
      },
     
    ],
  },
]);
