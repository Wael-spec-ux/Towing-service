import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Layout from './components/Layout';
import './App.css'
import ReservationForm from './components/ReservationForm';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import LoginPage from './pages/LoginPage';
import ContactUs from './pages/ContactUs';
import OurServices from './pages/OurServices';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Navigate } from 'react-router';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const driverToken = localStorage.getItem('DriverToken');
  if (!token && !driverToken) return <Navigate to="/login" replace />;
  return children;
};
function App() {
  return (
    <>
      <BrowserRouter>
      <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path="/reserve" element={<ReservationForm />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/AdminDashboard' element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>}/>
        <Route path='/DriverDashboard' element={<ProtectedRoute><DriverDashboard /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/services' element={<OurServices />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
      </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
