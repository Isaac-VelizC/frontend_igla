import Admin from 'layouts/admin';
import AuthLayout from 'layouts/auth';
import Rtl from 'layouts/rtl';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Error404 from 'views/errors/Error404';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname.startsWith('/admin')) {
      window.location.href = '/auth/login';
    }
  }, [isAuthenticated, location]);

  return (
      <Routes>
        {/* error */}
        <Route path='*' element={<Error404/>} />
        {/* rutas */}
        <Route path='admin/*' element={isAuthenticated ? <Admin/> : <Navigate to="/auth/login" replace />} />
        <Route path='auth/*' element={!isAuthenticated ? <AuthLayout/> : <Navigate to="/" replace />} />
        <Route path='rtl/*' element={<Rtl/>} />
        <Route path='/' element={<Navigate to="/admin/home" replace />} />
      </Routes>
    
  );
}

export default App;
