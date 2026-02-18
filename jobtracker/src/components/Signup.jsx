import React from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

function Signup() {
  const navigate = useNavigate();
 const {user,signInWithGoogle, error, loading} = useAuthStore();

 const handleClick = async () => {
  try {
    if (user) {
      navigate("/dashboard");
      return;
    }
    
    await signInWithGoogle();
    navigate("/dashboard");
  } catch (e) {
    error(e.message);
  }
 };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center">
      <div className="glass-card text-center p-5">
        <h4 className="fw-bold mb-2">Create your account</h4>
        <p className="text-muted mb-4">
          Sign up in seconds using your Google account
        </p>

        <button className="google-btn d-flex align-items-center justify-content-center gap-2" onClick={handleClick} disabled={loading}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width="24"
            height="24"
          />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="text-muted mt-4 small">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Signup;
