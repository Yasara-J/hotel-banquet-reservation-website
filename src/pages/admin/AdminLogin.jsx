import axios from "axios";
import { useState } from "react";

export default function AdminLogin() {
  const [errors, setErrors] = useState("");
  const [errorCount, setErrorCount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}adminLoginVerify.php`, {
        email,
        password,
      });
      if (response.data.message === "success") {
        window.location.href = "/admin/dashboard";
        sessionStorage.setItem("adminId", response.data.admin_id);
        sessionStorage.setItem("adminToken", response.data.token);
        return;
      }
      setErrorCount((prev) => prev + 1);
      setErrors(response.data.message);
    } catch (error) {
      console.error(error);
      setErrors("An error occurred. Please try again.");
      setErrorCount((prev) => prev + 1);
    }
  };

  return (
    <main>
      <div className="container py-5 px-2">
        <h2 className="text-center mb-5">Admin Login</h2>
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {errors && (
                <div className="alert alert-danger">
                  {errors}
                  <span className="badge ms-1 bg-danger">{errorCount}</span>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
