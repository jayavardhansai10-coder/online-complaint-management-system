import MainLayout from "../layouts/MainLayout";
import ComplaintTable from "../components/ComplaintTable";

function AdminComplaints() {
  return (
    <MainLayout>
      <div className="container mt-4">

        <div className="card shadow border-0 rounded-4">

          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">All Complaints</h3>
          </div>

          <div className="card-body">
            <ComplaintTable />
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default AdminComplaints;