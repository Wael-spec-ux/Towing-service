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
import { Navigate } from 'react-router';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
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
        <Route path='/DriverDashboard' element={<DriverDashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/services' element={<OurServices />} />
      </Routes>
      </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
