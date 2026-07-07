import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";
import { addFeedback } from "../services/feedbackService";

function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Comment Required",
        text: "Please write your feedback.",
      });
    }

    try {
      setLoading(true);

      await addFeedback({
        complaint: id,
        rating: Number(rating),
        comment: comment.trim(),
      });

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Feedback submitted successfully.",
      });

      navigate("/mycomplaints");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err.response?.data?.message ||
          "Unable to submit feedback.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4">
        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-header bg-success text-white">
            <h3 className="mb-0">Complaint Feedback</h3>
          </div>

          <div className="card-body">

            <form onSubmit={submitFeedback}>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Rating
                </label>

                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) =>
                    setRating(Number(e.target.value))
                  }
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Poor</option>
                  <option value={1}>⭐ Very Poor</option>
                </select>

              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Comment
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  placeholder="Write your feedback..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Feedback"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Feedback;