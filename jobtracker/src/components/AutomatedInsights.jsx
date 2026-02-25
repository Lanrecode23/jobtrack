import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { useJobStore } from "../Store/useJobStore";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AutomatedInsights = () => {
  const { jobs } = useJobStore();


  // EMPTY STATE
  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-4 bg-light min-vh-100">
        <h4 className="fw-semibold mb-4 mt-2">Automated Insights</h4>
        <p className="text-muted">No applications yet. Start adding jobs to see insights.</p>
      </div>
    );
  }


  // STATUS COUNT (DONUT)
  const statusCounts = jobs.reduce((acc, job) => {
    const status = job.status || "Pending";
    if (!acc[status]) acc[status] = 0;
    acc[status]++;
    return acc;
  }, {});

  const statusLabels = Object.keys(statusCounts);
  const statusValues = Object.values(statusCounts);

  const statusColors = [
    "#facc15", // Pending
    "#22c55e", // Offer
    "#ef4444", // Rejected
    "#3b82f6"  // Others
  ];

  const statusData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusValues,
        backgroundColor: statusColors,
        borderWidth: 0
      }
    ]
  };

  const donutOptions = {
    cutout: "65%",
    plugins: { legend: { display: false } }
  };


  // INTERVIEWS PER MONTH (BAR)

  const monthlyCounts = {};

  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const sortedLabels = Object.keys(monthlyCounts).sort((a, b) =>
    monthOrder.indexOf(a) - monthOrder.indexOf(b)
  );


  jobs.forEach((job) => {
    if (!job.interviewDate) return;

    const month = new Date(job.interviewDate).toLocaleString("default", {
      month: "long"
    });

    if (!monthlyCounts[month]) monthlyCounts[month] = 0;
    monthlyCounts[month]++;
  });

  const interviewData = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Interviews",
        data: sortedLabels.map(month => monthlyCounts[month]),
        backgroundColor: "#3b82f6",
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };


  // SMART INSIGHTS
  const total = jobs.length;
  const offers = jobs.filter(job => job.status === "Offer").length;
  const rejected = jobs.filter(job => job.status === "Rejected").length;
  const applied = jobs.filter(job => job.status === "Applied").length;

  let insightMessage = "";

  if (offers > 0) {
    insightMessage = `You received ${offers} offer(s). Great job!`;
  } else if (applied > 5) {
    insightMessage = "You are actively applying. Keep going!";
  } else {
    insightMessage = `You have ${total} total applications.`;
  }

  return (
    <div className="p-4 bg-light min-vh-100">
      <hr />
      <h4 className="fw-semibold mb-4 mt-2">Automated Insights</h4>

      <Row className="g-4">
        {/* LEFT CARD */}
        <Col md={6}>
          <Card className="shadow-sm border-0 p-3 h-100">
            <h6 className="fw-semibold mb-3">Applications by Status</h6>

            <div className="d-flex align-items-center">
              <div style={{ width: "150px" }}>
                <Doughnut data={statusData} options={donutOptions} />
              </div>

              <div className="ms-4 w-100">
                {statusLabels.map((label, index) => (
                  <LegendRow
                    key={label}
                    color={statusColors[index]}
                    label={label}
                    value={statusCounts[label]}
                  />
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* RIGHT CARD */}
        <Col md={6}>
          <Card className="shadow-sm border-0 p-3 h-100">
            <h6 className="fw-semibold mb-3">Interviews Per Month</h6>

            <Bar data={interviewData} options={barOptions} />

            <div className="mt-3 small text-muted">
              <div className="mb-2">• {insightMessage}</div>
              <div>• {rejected} application(s) were rejected</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const LegendRow = ({ color, label, value }) => (
  <div className="d-flex justify-content-between align-items-center mb-2">
    <div className="d-flex align-items-center">
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          display: "inline-block",
          backgroundColor: color
        }}
        className="me-2"
      ></span>
      {label}
    </div>
    <span className="fw-semibold">{value}</span>
  </div>
);

export default AutomatedInsights;