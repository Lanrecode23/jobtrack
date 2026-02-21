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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AutomatedInsights = () => {
  // Donut Data
  const statusData = {
    labels: ["Pending", "Offer", "Rejected"],
    datasets: [
      {
        data: [5, 3, 2],
        backgroundColor: ["#facc15", "#22c55e", "#ef4444"],
        borderWidth: 0
      }
    ]
  };

  const donutOptions = {
    cutout: "65%",
    plugins: {
      legend: { display: false }
    }
  };

  // Bar Data
  const interviewData = {
    labels: ["June", "July", "August"],
    datasets: [
      {
        label: "Interviews",
        data: [3, 4, 3],
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
                <LegendRow color="#facc15" label="Pending" value={5} />
                <LegendRow color="#22c55e" label="Offer" value={3} />
                <LegendRow color="#ef4444" label="Rejected" value={2} />

                <hr />

                <div className="d-flex justify-content-between small text-muted">
                  <span>
                    <span
                      style={legendDot("#3b82f6")}
                      className="me-2"
                    ></span>
                    Pending 5
                  </span>
                  <span>
                    <span
                      style={legendDot("#22c55e")}
                      className="me-2"
                    ></span>
                    Rejected 2
                  </span>
                </div>
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
              <div className="mb-2">
                • Notes & Statistics: in August
              </div>
              <div>
                • Invite sent for 5 interviews in July and August
              </div>
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
      <span style={legendDot(color)} className="me-2"></span>
      {label}
    </div>
    <span className="fw-semibold">{value}</span>
  </div>
);

const legendDot = (color) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  display: "inline-block",
  backgroundColor: color
});

export default AutomatedInsights;