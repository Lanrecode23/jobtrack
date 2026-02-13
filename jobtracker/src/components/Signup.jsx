import React from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../FirebaseConfig/FirebaseConfig";

function Signup() {
  const navigate = useNavigate();
  const handleGoogleSignup = async () => {
    
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;
        console.log("Google user signed in:", user);
        // Redirect to the home page or any other desired route
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center">
      <div className="glass-card text-center p-5">
        <h4 className="fw-bold mb-2">Create your account</h4>
        <p className="text-muted mb-4">
          Sign up in seconds using your Google account
        </p>

        <button className="google-btn d-flex align-items-center justify-content-center gap-2" onClick={handleGoogleSignup}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width="24"
            height="24"
          />
          Continue with Google
        </button>

        <p className="text-muted mt-4 small">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Signup;
