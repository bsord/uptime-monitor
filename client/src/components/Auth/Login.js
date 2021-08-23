import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import FriendlyError from "../Util/FriendlyError";

function Login() {
  const {login, loading, error} = useContext(AuthContext)

  const history = useHistory();
  //const { user, loading, error, login, login, logout } = auth();

  const [loginInfo, setRegisterInfo] = useState({username: "", password: ""});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegisterInfo({ ...loginInfo, [name]: value });
  };

  const loginUser = () => {
    login(loginInfo.username, loginInfo.password, result => {
      if(result.status === "success"){
        history.push("/dashboard")
      }
    })
  };
 
  return (
    <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={loginInfo.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={loginInfo.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>
          
          {loading? <>loading</> : <button onClick={loginUser} className="btn btn-success">
            Login
          </button>}

          {error && <FriendlyError error={error}/>}
          <br />
        </div>
    </div>

  );
}

export default Login;