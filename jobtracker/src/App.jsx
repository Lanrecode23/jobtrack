import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Home from './Home/Home'
import Welcome from './components/Welcome'
import TrackingForm from './components/TrackingForm'
import Reminders from './components/Reminders'
import Insights from './components/Insights'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuthStore } from './Store/useAuthStore'



function App() {

  const { checkAuthState } = useAuthStore();

  useEffect(() => {
    const unsubscribe = checkAuthState();
    return () => unsubscribe();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Welcome />} />
            <Route path="/dashboard/tracking" element={<TrackingForm />} />
            <Route path="/dashboard/reminders" element={<Reminders />} />
            <Route path="/dashboard/insights" element={<Insights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
