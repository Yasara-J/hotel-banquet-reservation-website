import { useState } from "react";
import axios from "axios";
import TitleBar from "./components/TitleBar";

export default function Settings() {
  const AuthToken = sessionStorage.getItem("adminToken");
  const adminId = sessionStorage.getItem("adminId");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!AuthToken) {
    alert("Please login first");
    window.location.href = "/admin";
    return null;
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 letter, 1 number, 1 special character

    // Password validation
    if (!passwordPattern.test(newPassword)) {
      setMessage("Password must be at least 8 characters long, include a letter, a number, and a special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}settingController.php`,
        {
          adminId,
          newPassword,
        }
      );

      if (response.data.success) {
        setMessage("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error updating password");
    }
  };

  return (
    <main>
      <TitleBar title="Settings" />
      <div className="row justify-content-center">
        <div className="col-md-6 p-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <form onSubmit={handlePasswordChange}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {message && <div className="alert alert-info">{message}</div>}
                <button type="submit" className="btn btn-primary w-100">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
