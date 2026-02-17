import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const {user, loading} = useAuthStore();

    useEffect(() => {
        if(!user && !loading) {
            navigate('/signup');
        }
    }, [user, loading, navigate])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute
