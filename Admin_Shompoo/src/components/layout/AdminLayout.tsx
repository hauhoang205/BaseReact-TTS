
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

export default function AdminLayout() {
  return (
    <div>  
     <Header />
      <main>
        <Outlet />
      </main>

    <Footer />
    
    </div>
  );
}