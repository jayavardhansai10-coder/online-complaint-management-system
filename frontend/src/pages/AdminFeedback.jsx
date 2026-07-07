import { useEffect, useState } from "react";
import { getFeedback } from "../services/feedbackService";
import MainLayout from "../layouts/MainLayout";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const res = await getFeedback();

      setFeedbacks(res.data.feedback || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4">

        <div className="card shadow border-0">

          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">⭐ User Feedback</h4>
          </div>

          <div className="card-body">

            <table className="table table-hover table-striped align-middle shadow-sm">

              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Complaint</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {feedbacks.length === 0 ? (

                  <tr>
                    <td colSpan="5" className="text-center">
                      No Feedback Available
                    </td>
                  </tr>

                ) : (

                  feedbacks.map((item) => (

                    <tr key={item._id}>

                      <td>{item.user?.name}</td>

                      <td>{item.complaint?.title}</td>

                      <td>{"⭐".repeat(item.rating)}</td>

                      <td>{item.comment || "No Comment"}</td>

                      <td>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default AdminFeedback;