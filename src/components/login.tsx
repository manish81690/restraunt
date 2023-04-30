import React, { useState } from "react";
import axios from "axios";

import '../styles/login.css'
import { useDispatch } from "react-redux";
import { setUserId } from "../store/homePageSlice";

interface LoginProps {
  setUser: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    try {
      const response = await axios.get(
        "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3",
        {
          headers: {
            Authorization: "Bearer keyfXgn8PL6pB3x32",
          },
          params: {
            filterByFormula: `AND(username="${username}", password="${password}")`,
          },
        }
      );
      setUser(response.data.records[0]);
      dispatch(setUserId(response.data.records[0].id));
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="content">
        <div className="flex-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="input-group">
                <label className="subtitle">USERNAME</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="subtitle">PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
