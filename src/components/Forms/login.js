import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './login.css';

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const LoginModal = (props) => {
  const { toggleShowLogin, loginUser } = props;

  return <Login toggleShowLogin={toggleShowLogin} loginUser={loginUser} />;
};

const LoginForm = (props) => {
  const { toggleShowLogin, loginUser } = props;

  return (
    <React.Fragment key="login-form">
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('react-backdrop')
      )}
      {ReactDOM.createPortal(
        <LoginModal toggleShowLogin={toggleShowLogin} loginUser={loginUser} />,
        document.getElementById('react-modal')
      )}
    </React.Fragment>
  );
};

const Login = (props) => {
  const { toggleShowLogin, loginUser } = props;

  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      if (userData.username.trim() === '' || userData.password.length <= 4)
        throw new Error('Re-Check your credentials');
      loginUser(userData, setSuccess, setError);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
      console.error(error.message);
    }
  };
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

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <React.Fragment key="login">
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
        {success && <div id="success">Successful!</div>}
        {error && <div id="failure">Something went wrong</div>}
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
