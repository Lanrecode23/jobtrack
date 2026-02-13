import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();
    const handleNav = () => {
        navigate("/signup");
    };
    return (
        <section className="hero-section py-5">
            <div className="container text-center py-5">
                <span className="hero-badge mb-4 d-inline-block">
                    The #1 Job Application Tracker
                </span>
                <h1 className="hero-title mb-4">
                    Master Your <span>Career Search</span>
                </h1>
                <p className="hero-text mx-auto mb-5">
                    Organize your job hunt with our all-in-one application and interview
                    tracker. Stop using messy spreadsheets and start getting hired.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                    <button className="btn btn-primary-custom" onClick={handleNav}>
                        Get Started for Free
                    </button>

                    <button className="btn btn-secondary-custom">
                        Explore Features
                    </button>
                </div>

                <p className="hero-trust mt-4">
                    Join over <strong>10,000+</strong> candidates tracking their success.
                </p>
           
                {/* Dashboard Mockup */}
                <div className="dashboard-wrapper mt-5">
                    <div className="dashboard-glow"></div>

                    <div className="dashboard-mockup">
                        <div className="dashboard-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <img
                            src="https://i.pinimg.com/originals/98/5d/6d/985d6daccc6ebd6bc717b6671a93d590.png"
                            alt="dashboard"
                            className="img-fluid dashboard-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
