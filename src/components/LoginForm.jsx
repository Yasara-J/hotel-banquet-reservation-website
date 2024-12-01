import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const customerData = sessionStorage.getItem("customer");
  const isLogin = customerData ? true : false;
  if (isLogin) {
    navigate("/reservations");
    return;
  }

  const apiUrlUser = import.meta.env.VITE_API_URL_USER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrlUser}login.php`, {
        email,
        password,
      });
      if (response.data.success) {
        sessionStorage.setItem(
          "customer",
          JSON.stringify(response.data.customer)
        );
        navigate("/reservations");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-form container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="card p-5 col-md-6">
          <form onSubmit={handleSubmit}>
            <h3 className="text-start fw-bold mb-4">Customer Login</h3>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
