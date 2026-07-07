import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../layouts/MainLayout";

import {
  getAgents,
  assignComplaintToAgent,
} from "../services/complaintService";

function AssignComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const res = await getAgents();

      console.log("Agents Response:", res.data);

      // Handle both possible response formats
      if (Array.isArray(res.data)) {
        setAgents(res.data);
      } else if (Array.isArray(res.data.agents)) {
        setAgents(res.data.agents);
      } else {
        setAgents([]);
      }
    } catch (err) {
      console.log(err);

      Swal.fire(
        "Error",
        "Failed to load agents",
        "error"
      );
    }
  };

  const assignComplaint = async () => {
    if (!selectedAgent) {
      return Swal.fire(
        "Warning",
        "Please select an agent",
        "warning"
      );
    }

    try {
      await assignComplaintToAgent(
        id,
        selectedAgent
      );

      Swal.fire(
        "Success",
        "Complaint Assigned Successfully",
        "success"
      );

      navigate("/admin");
    } catch (err) {
      console.log(err);

      Swal.fire(
        "Error",
        "Assignment Failed",
        "error"
      );
    }
  };

  return (
    <MainLayout>
      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-primary text-white">
          Assign Complaint
        </div>

        <div className="card-body">

          <label className="form-label">
            Select Agent
          </label>

          <select
            className="form-select"
            value={selectedAgent}
            onChange={(e) =>
              setSelectedAgent(e.target.value)
            }
          >
            <option value="">
              -- Select Agent --
            </option>

            {Array.isArray(agents) &&
              agents.map((agent) => (
                <option
                  key={agent._id}
                  value={agent._id}
                >
                  {agent.name} ({agent.email})
                </option>
              ))}
          </select>

          <button
            className="btn btn-success mt-4"
            onClick={assignComplaint}
          >
            Assign Agent
          </button>

        </div>

      </div>
    </MainLayout>
  );
}

export default AssignComplaint;