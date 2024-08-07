import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const errorUtils = {
  getError: (error) => {
    let e = error;
    if (error.response) {
      e = error.response.data;                   // data, status, headers
      if (error.response.data && error.response.data.error) {
        e = error.response.data.error;           // my app specific keys override
      }
    } else if (error.message) {
      e = error.message;
    } else {
      e = "Unknown error occured";
    }
    return e;
  },
};

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    admin_password: ""
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", inputs);
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
                <input required type="text" placeholder="username" name="username" onChange={handleChange} />
                <input required type="email" placeholder="email" name="email" onChange={handleChange} />
                <input required type="password" placeholder="password" name="password" onChange={handleChange} />
                <input required type="password" placeholder="admin password" name="admin_password" onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{JSON.stringify(err)}</p>}
                <p>Do you have an account? <Link className="hvr-underline-from-left" to="/login">Login</Link></p>
            </form>
        </div>
    </div>
  );
};

export default Register;