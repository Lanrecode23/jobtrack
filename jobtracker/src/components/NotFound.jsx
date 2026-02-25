import React from 'react'
import notFound from '../assets/notFound.jpg'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <Header />

      <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "70vh" }}>
        <img 
          src={notFound} 
          alt="Page Not Found" 
          className="img-fluid w-50 mb-4 mt-5"
        />
        <p className='fw-semibold'>Oops! The page you're looking for doesn't exist. <Link to="/"> Home</Link></p>
      </div>

      <Footer />
    </>
  )
}

export default NotFound