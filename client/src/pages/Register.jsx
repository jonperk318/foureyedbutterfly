import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { errorUtils } from "@/utils/errorUtils";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    admin_password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register/", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.log(errorUtils.getError(err));
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h1>Register</h1>
        <form>
          <input
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="admin password"
            name="admin_password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Register</button>
          {err && <p>{JSON.stringify(err)}</p>}
          <p>
            Do you have an account?{" "}
            <Link className="underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
