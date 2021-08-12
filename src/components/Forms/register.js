import React, { useState } from 'react';
import { defaultUserRegisterState } from '../../defaultStates';
import './register.css';

const Register = (props) => {
  const { toggleShowRegister, createNewUser } = props;

  const [userData, setUserData] = useState(defaultUserRegisterState);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnClose = () => {
    toggleShowRegister((prev) => ({ ...prev, register: false }));
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      if (
        userData.email.trim() === '' ||
        userData.username.trim() === '' ||
        userData.password.length <= 4
      )
        throw new Error('Re-Check your credentials');
      createNewUser(userData, setSuccess, setError);
      setUserData(defaultUserRegisterState);
    } catch (error) {
      setError(true);
      setSuccess(false);
      console.error(error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="header">
        <div>
          Welcome
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
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <button type="submit">Register</button>
      </div>
      {success && <div id="success">Successful!</div>}
      {error && (
        <div id="failure">
          Something went wrong! Please re-check your details
        </div>
      )}
    </form>
  );
};

export default Register;
