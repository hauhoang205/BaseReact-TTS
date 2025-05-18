import MainLayout from "components/layout/MainLayout";
import About from "pages/About/About";
import Home from "pages/Home";
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
      }
    ],
  },
]);
