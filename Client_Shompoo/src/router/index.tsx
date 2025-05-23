import MainLayout from "components/layout/MainLayout";
import About from "pages/About/About";
import Cart from "pages/Cart/Cart";
import Home from "pages/Home";
import Login from "pages/Login/Login";
import ProductDetail from "pages/Product-Detail/productDetail";
import Register from "pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true,         
        element: <Home />,
      },
      {
        path: "about",     
        element: <About />,
      },
      {
        path: "register",     
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/products/:id", // Thay thế bằng đường dẫn sản phẩm cụ thể
        element: <ProductDetail/>, 
      },
      {
        path: "/cart",
        element: <Cart/>
      }
    ],
  },
]);
