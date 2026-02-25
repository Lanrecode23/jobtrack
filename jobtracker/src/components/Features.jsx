import React from "react";
import { Briefcase, Bell, BarChart3, ArrowRight } from 'lucide-react';

function Features() {
  const featureData = [
    {
      icon: Briefcase,
      title: "Centralized Tracking",
      color: '#3b82f6',
      description: "Keep all your job descriptions, resumes, and contacts in one organized dashboard.",
    },
    {
      icon: Bell,
      title: "Interview Reminders",
      color: '#8b5cf6',
      description: "Never miss a follow-up or interview with automated calendar synchronization.",
    },
    {
      icon: BarChart3,
      title: "Automated Insights",
      color: '#10b981',
      description: "Get data on your success rates and visualize your progress through the pipeline.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="features">
      <div className="container">
        <div className="text-center mb-5">
          <h3 className="fw-bold mb-4">Everything you need to land the job</h3>
          <p className="text-muted">Stay organized and ahead of the competition with our powerful suite of tracking tools.</p>
        </div>
        <div className="row g-4" >
          {featureData.map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 features_card shadow-md text-center py-4" >
              <div 
                    className="rounded-circle d-flex justify-content-center mx-auto align-items-center mb-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: feature.color
                    }}
                  >
                    <feature.icon size={24} color="white" />
                  </div>
                <h5 className="fw-bold fs-5">{feature.title}</h5>
                <p className="text-center fs-6">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
