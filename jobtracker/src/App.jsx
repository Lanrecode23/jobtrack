import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './Home/Home'
import Welcome from './components/Welcome'
import Tracking from './components/Tracking'
import Reminders from './components/Reminders'
import Insights from './components/Insights'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Welcome />} />
            <Route path="/dashboard/tracking" element={<Tracking />} />
            <Route path="/dashboard/reminders" element={<Reminders />} />
            <Route path="/dashboard/insights" element={<Insights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
