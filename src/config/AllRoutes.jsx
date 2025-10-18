import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useContext } from 'react'
import authContext from '../context/AuthContext'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'

import About from '../pages/About'
// const About = lazy(() => import('../pages/About'))
import Home from '../pages/Home'
// const Home = lazy(() => import('../pages/Home'))
import Signup from '../pages/Signup'
// const Signup = lazy(() => import('../pages/Signup'))
import Login from '../pages/Login'
// const Login = lazy(() => import('../pages/Login'))
import Contact from '../pages/Contact'
// const Contact = lazy(() => import('../pages/Contact'))
// const Products = lazy(() => import('../pages/Products'))
import Services from '../pages/Services'
// const Services = lazy(() => import('../pages/Services'))
import Dashboard from '../pages/Dashboard'
// const Dashboard = lazy(() => import('../pages/Dashboard'))
import CreatePitch from '../pages/CreatePitch'
import ViewPitch from '../pages/ViewPitch'
import PageNotFound from '../pages/PageNotFound'
// Update your AllRoutes component
function AllRoutes() {
    let currentUser = useContext(authContext)

    return (
        <BrowserRouter>
            <Navbar isUser={currentUser} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={!currentUser ? <Login /> : <Navigate to="/dashboard" replace />} />
                <Route path='/signup' element={!currentUser ? <Signup /> : <Navigate to="/dashboard" replace />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/services' element={<Services />} />
                <Route path='*' element={<PageNotFound/>} />
                <Route path='/dashboard' element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path='/create-pitch' element={currentUser ? <CreatePitch /> : <Navigate to="/login" replace />} />
                <Route path='/pitch/:id' element={currentUser ? <ViewPitch /> : <Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes



