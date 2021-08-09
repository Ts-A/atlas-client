import { useState } from 'react';
import './login.css';

const Login = (props) => {
  const { toggleShowLogin } = props;
  const handleSubmit = () => {};
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const handleInputChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleOnClose = () => {
    toggleShowLogin(false);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="header">
        <div>
          Login
          <span
            class="material-icons"
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
    </form>
  );
};

export default Login;
