import React from "react";

function Features() {
  const featureData = [
    {
      icon: "bi bi-folder2-open",
      title: "Centralized Tracking",
      description: "Keep all your job descriptions, resumes, and contacts in one organized dashboard.",
    },
    {
      icon: "bi-calendar-date",
      title: "Interview Reminders",
      description: "Never miss a follow-up or interview with automated calendar synchronization.",
    },
    {
      icon: "bi-bar-chart-line",
      title: "Automated Insights",
      description: "Get data on your success rates and visualize your progress through the pipeline.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="features">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Everything you need to land the job</h2>
          <p className="text-muted">Stay organized and ahead of the competition with our powerful suite of tracking tools.</p>
        </div>
        <div className="row g-4">
          {featureData.map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 features_card shadow-md text-center p-3">
                <div className="mb-3 fs-1 text-primary-custom">
                  <i className={feature.icon}></i>
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
