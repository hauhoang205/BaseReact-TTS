import { useState, useEffect } from 'react';

export const useAuthSimple = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userInfo = localStorage.getItem('userInfo');
      
      if (token && userInfo) {
        try {
          const userData = JSON.parse(userInfo);
          setUser(userData);
        } catch (e) {
          console.log('Lỗi parse userInfo:', e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return { user, isLoading, isLoggedIn: !!user };
};

export const useLogoutSimple = () => {
  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.reload();
  };
};