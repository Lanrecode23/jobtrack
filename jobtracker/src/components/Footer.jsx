import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-top py-4 mt-5">
      <div className="container text-center">
        <div className="mb-3">
          <a href="#" className="text-muted mx-2 text-decoration-none">Features</a>
          <a href="#" className="text-muted mx-2 text-decoration-none">Pricing</a>
          <a href="#" className="text-muted mx-2 text-decoration-none">Terms of Service</a>
          <a href="#" className="text-muted mx-2 text-decoration-none">Privacy Policy</a>
        </div>
        <div className="mb-2">
          <i className="bi bi-globe mx-2"></i>
          <i className="bi bi-share mx-2"></i>
          <i className="bi bi-chat-dots mx-2"></i>
        </div>
        <p className="text-muted small mb-0">© {new Date().getFullYear()} JobTrack Inc. Built for ambitious candidates.</p>
      </div>
    </footer>
  );
}

export default Footer;
