import React from "react";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signup");
  };
  
  return (
    <section className="py-5 text-center">
      <div className="container">
        <h3 className="fw-bold mb-3">Ready to organize your search?</h3>
        <p className="text-muted mb-4">
          Sign up today and get your custom dashboard set up in less than 2 minutes.
        </p>
        <button className="btn signUp btn-primary btn-lg" onClick={handleNavigate}>Sign Up Now</button>
      </div>
    </section>
  );
}

export default CTA;
