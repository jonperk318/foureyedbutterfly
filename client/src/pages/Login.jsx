import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "@/context/authContext.jsx";
import { errorUtils } from "@/utils/errorUtils.js";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post("/api/auth/login", inputs);
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(errorUtils.getError(err));
    }
  };

  return (
    <div className="auth">
      <div className="auth-container login-container">
        <h1>Welcome, Ruby.</h1>
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
          <button onClick={handleSubmit}>Login</button>
          {err && <p>{JSON.stringify(err)}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
