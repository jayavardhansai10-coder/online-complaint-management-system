import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ComplaintBarChart({
  pending,
  assigned,
  resolved,
}) {
  const data = {
    labels: [
      "Pending",
      "Assigned",
      "Resolved",
    ],
    datasets: [
      {
        label: "Complaints",
        data: [
          pending,
          assigned,
          resolved,
        ],
        backgroundColor: [
          "#ffc107",
          "#0d6efd",
          "#198754",
        ],
      },
    ],
  };

  return <Bar data={data} />;
}

export default ComplaintBarChart;