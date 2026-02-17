import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Bell, BarChart3, ArrowRight } from 'lucide-react';
import '../styles/Welcome.css'
import { useAuthStore } from '../Store/useAuthStore';
import TrackingFormList from './TrackingFormList';

function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const displayName = user?.displayName ;

  const features = [
    {
      icon: Briefcase,
      title: 'Centralized Tracking',
      description: 'Keep all your job applications organized in one place. Track status, deadlines, and company details effortlessly.',
      color: '#3b82f6',
      route: '/dashboard/tracking'
    },
    {
      icon: Bell,
      title: 'Interview Reminders',
      description: 'Never miss an interview! Get timely reminders and manage your interview schedule with ease.',
      color: '#8b5cf6',
      route: '/dashboard/reminders'
    },
    {
      icon: BarChart3,
      title: 'Automated Insights',
      description: 'Gain valuable insights with analytics on your job search progress, success rates, and trends.',
      color: '#10b981',
      route: '/dashboard/insights'
    }
  ];

  return (
    <div className="container py-4">

      <div className="text-center mb-5">
        <h3 className="fw-bold welcome-title">Welcome back, <span style={{color: "#0b3c8bff"}}>{displayName}</span> 👋</h3>
        <p className="text-muted todo">Track your job applications and stay organized throughout your job search journey.</p>
      </div>

      {/* Feature Cards */}
      <div>
        <h4 className="mb-4 todo">What would you like to do?</h4>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4">
              <div className="card feature-card h-100 shadow-sm">
                <div className="card-body d-flex flex-column align-items-start">
                  <div 
                    className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: feature.color
                    }}
                  >
                    <feature.icon size={24} color="white" />
                  </div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                  <button 
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(feature.route)}
                  >
                    Start <ArrowRight size={18} className="ms-1"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TrackingFormList/>

    </div>
  );
}

export default Welcome;
