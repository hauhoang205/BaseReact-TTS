import MainLayout from "components/layout/MainLayout";
import About from "pages/About/About";
import Cart from "pages/Cart/Cart";
import Checkout from "pages/Checkout/Checkout";
import Home from "pages/Home";
import Login from "pages/Login/Login";
import ProductDetail from "pages/Product-Detail/productDetail";
import ProductInCategory from "pages/ProductInCategory/productInCategory";
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
        path: "/products/:id", 
        element: <ProductDetail/>, 
      },
       {
        path: "/category/:categoryId", 
        element: <ProductInCategory/>, 
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/checkout",
        element: <Checkout/>
      }
    ],
  },
]);
