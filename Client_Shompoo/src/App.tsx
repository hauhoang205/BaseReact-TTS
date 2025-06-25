import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';  // import router đã tạo
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>    
    <RouterProvider router={router} />
     <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
    
  );
}

export default App;



