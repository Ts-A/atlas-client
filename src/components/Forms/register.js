import { useState } from 'react';
import './register.css';

const Register = (props) => {
  const { toggleShowRegister } = props;
  const handleSubmit = () => {};
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleInputChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleOnClose = () => {
    toggleShowRegister(false);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="header">
        <div>
          Welcome
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
    </form>
  );
};

export default Register;
