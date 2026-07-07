function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">

        <div className="row">

          <div className="col-md-6">
            <h4>Complaint Management System</h4>
            <p>
              A smart platform to register, track and resolve complaints quickly.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Quick Links</h5>

            <ul className="list-unstyled">
              <li>Home</li>
              <li>Dashboard</li>
              <li>Complaints</li>
              <li>Login</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5>Contact</h5>

            <p>Email: support@cms.com</p>
            <p>Phone: +91 9876543210</p>
          </div>

        </div>

        <hr />

        <p className="text-center mb-0">
          © 2026 Complaint Management System. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;