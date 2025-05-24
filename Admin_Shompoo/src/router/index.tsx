
import AdminLayout from "components/layout/AdminLayout";
import CategoryAdd from "pages/Category/CategoryAdd";
import CategoryList from "pages/Category/CategoryList";
import Dasborad from "pages/Dashboard/Dasborad";
import ProductList from "pages/Product";
import UserList from "pages/Account/UserList";
import { createBrowserRouter } from "react-router-dom";
import AdminList from "pages/Account/AdminList";
import ProductEdit from "pages/Product/ProductEdit";
import ProductAdd from "pages/Product/ProductAdd";
import ProductDelete from "pages/Product/ProductDelete";

export const router = createBrowserRouter([
  {
    path: "",
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
        path: "product-edit/:id",
        element: <ProductEdit />,  
      },
       {
        path: "product-delete",
        element: <ProductDelete />,  
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