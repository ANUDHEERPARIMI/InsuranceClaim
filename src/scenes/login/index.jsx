import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme"; // Ensure the tokens are properly set up for colors
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // Import the custom CSS file

function LoginPage() {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8082/api/login/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });
      // const response = await axios.post("http://localhost:8073/api/consumer/login", credentials, {
      //   headers: { "Content-Type": "application/json" },
      // });

      const { id, username, isManager } = response.data;
      // Store authentication data
      localStorage.setItem("id", id);
      localStorage.setItem("username", username);
      localStorage.setItem("isManager", JSON.stringify(isManager));

      // Redirect to dashboard
      navigate(`/app/${id}/dashboard`, { state: { id, username, isManager } });
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box className="mainContainer">
      <div className="mainLeft">
        <img src="src/scenes/login/doctor.png" className="img" alt="Doctor" />
      </div>

      <div className="mainRight">
        <div className="formsComplete">
          <form onSubmit={handleSubmit} className="form">
          <h1 className="title" style={{ color: "green" }}> Login | Health </h1>

            {error && <Typography color="error">{error}</Typography>}
            <div className="formInto">
              <div className="intoInput">
                <label className="labels" style={{ color: "green" }}>Username:</label>
                <input
                  type="text"
                  className="inputBase"
                  placeholder="Write your Username"
                  name="id"
                  value={credentials.id}
                  onChange={handleChange}
                />
              </div>
              <div className="intoInput">
                <label className="labels" style={{ color: "green" }}>Password:</label>
                <input
                  type="password"
                  className="inputBase"
                  placeholder="Write your Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <Button className="btn1" type="submit" fullWidth>
                Log In
              </Button>
              <p></p>
              <a href="#" className="link"></a>
              <a href="#" className="link"></a>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}

export default LoginPage;
