import React, { useState } from 'react';
import './login.css';

const Login = (props) => {
  const { toggleShowLogin, loginUser } = props;

  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      if (userData.username.trim().length === 0)
        throw new Error('Username field cannot be empty');
      if (userData.password.length === 0)
        throw new Error('Password field cannot be empty');
      loginUser(userData);
    } catch (error) {
      setWarning((prev) => ({ ...prev, empty: false, message: error.message }));
    }
  };
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setWarning({ empty: true, message: '' });
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnClose = () => {
    toggleShowLogin((prev) => ({ ...prev, login: false }));
  };

  const [warning, setWarning] = useState({ empty: true, message: '' });

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="header">
        <div>
          Login
          <span
            className="material-icons"
            style={{ fontSize: '32px', color: '#af1100' }}
          >
            room
          </span>
        </div>
        <span className="material-icons close" onClick={handleOnClose}>
          close
        </span>
      </div>
      <div className="field">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <button type="submit">Login</button>
      </div>
      {!warning.empty && <div id="warning">{warning.message}</div>}
    </form>
  );
};

export default Login;
