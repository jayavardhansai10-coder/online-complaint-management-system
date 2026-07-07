function ComplaintCard({ complaint }) {

  return (

    <div className="card shadow mb-3">

      <div className="card-body">

        <h5>{complaint.title}</h5>

        <p>{complaint.description}</p>

        <span className="badge bg-warning">
          {complaint.status}
        </span>

      </div>

    </div>

  );

}

export default ComplaintCard;