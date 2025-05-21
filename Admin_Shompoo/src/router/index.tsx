
import AdminLayout from "components/layout/AdminLayout";
import CategoryAdd from "pages/Category/CategoryAdd";
import CategoryList from "pages/Category/CategoryList";
import Dasborad from "pages/Dashboard/Dasborad";
import ProductList from "pages/Product";
import ProductAdd from "pages/Product/ProductAdd";
import UserList from "pages/Account/UserList";
import { createBrowserRouter } from "react-router-dom";
import AdminList from "pages/Account/AdminList";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      {
        index: true,         
        element: <Dasborad />,
      },
      {
        path: "product-list",
        element: <ProductList />,  
      },
       {
        path: "product-add",
        element: <ProductAdd />,  
      },
      {
        path: "category-list",
        element: <CategoryList />,
      },
      {
        path: "category-add",
        element: <CategoryAdd />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "admin-list",
        element: <AdminList />,
      },
    ],
  },
]);