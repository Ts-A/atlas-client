import React, { useRef } from 'react';
import './login.css';
import map from '../../images/map.jpg';

const Login = (props) => {
  const { toggleShowLogin, loginUser } = props;

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      if (username.trim().length === 0)
        throw new Error('Username field cannot be empty');
      if (password.length === 0)
        throw new Error('Password field cannot be empty');
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      loginUser({ username, password });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnClose = () => {
    toggleShowLogin((prev) => ({ ...prev, login: false }));
  };

  return (
    <div className="form-container">
      <span className="close">
        <span onClick={handleOnClose} className="material-icons">
          cancel
        </span>
      </span>
      <div className="login-image">
        <img src={map} alt="Globe" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-heading">
            <div>Login</div>
          </div>
          <div className="form-fields">
            <div className="form-field">
              <div>
                <span class="material-icons label-icon">account_circle</span>
              </div>
              <input
                type="text"
                placeholder="Username*"
                name="username"
                ref={usernameRef}
              />
            </div>
            <div className="form-field">
              <div>
                <span class="material-icons label-icon">lock</span>
              </div>
              <input
                type="password"
                placeholder="Password*"
                name="password"
                ref={passwordRef}
              />
            </div>
          </div>
          <div className="form-submission">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
