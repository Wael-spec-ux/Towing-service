import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Layout from './components/Layout';
import './App.css'
import ReservationForm from './components/ReservationForm';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import LoginPage from './pages/LoginPage';
function App() {

  return (
    <>
      <BrowserRouter>
      <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path="/reserve" element={<ReservationForm />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/DriverDashboard' element={<DriverDashboard />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
