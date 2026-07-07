import { useState } from "react";
import { createComplaint } from "../services/complaintService";

function ComplaintForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const submitComplaint = async (e) => {

    e.preventDefault();

    try {

      await createComplaint({
        title,
        description,
        category,
      });

      alert("Complaint Submitted Successfully");

      setTitle("");
      setDescription("");
      setCategory("");

    } catch (err) {

      alert("Submission Failed");

    }

  };

  return (

    <form onSubmit={submitComplaint}>

      <input
        className="form-control mb-3"
        placeholder="Complaint Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Complaint Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className="btn btn-primary">
        Submit Complaint
      </button>

    </form>

  );

}

export default ComplaintForm;