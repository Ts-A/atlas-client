import React, { useState } from 'react';
import { defaultUserRegisterState } from '../../defaultStates';
import './register.css';

const Register = (props) => {
  const { toggleShowRegister, createNewUser } = props;

  const [userData, setUserData] = useState(defaultUserRegisterState);

  const handleInputChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnClose = () => {
    toggleShowRegister((prev) => ({ ...prev, register: false }));
  };

  const [warning, setWarning] = useState({ empty: true, message: '' });

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      if (userData.username.trim().length === 0)
        throw new Error('Username field cannot be empty');
      if (userData.password.length <= 5)
        throw new Error('Password field should have a minimum of 5 characters');
      if (!userData.email.includes('@') || !userData.email.includes('.'))
        throw new Error('Enter a valid mail id');
      createNewUser(userData);
      setUserData(defaultUserRegisterState);
    } catch (error) {
      setWarning({ empty: false, message: error.message });
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
      {!warning.empty && <div id="warning">{warning.message}</div>}
    </form>
  );
};

export default Register;
