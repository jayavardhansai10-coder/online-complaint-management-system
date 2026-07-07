import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintCard from "../components/ComplaintCard";
import { useState } from "react";

function Dashboard() {
  const [complaints] = useState([
    {
      title: "Internet Issue",
      description: "Internet connection is not working.",
      status: "Pending",
    },
    {
      title: "Water Leakage",
      description: "Water leakage in Block A.",
      status: "Resolved",
    },
  ]);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>User Dashboard</h2>

        <ComplaintForm />

        <hr />

        <h3>My Complaints</h3>

        {complaints.map((item, index) => (
          <ComplaintCard key={index} complaint={item} />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;