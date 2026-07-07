import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ComplaintPieChart({
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

  return <Pie data={data} />;
}

export default ComplaintPieChart;