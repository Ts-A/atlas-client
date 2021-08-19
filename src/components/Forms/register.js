import React, { useRef } from 'react';
import './register.css';
import globe from '../../images/globe.jpg';
import { toast } from 'react-hot-toast';

const Register = (props) => {
  const { toggleShowRegister, createNewUser } = props;

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const handleOnClose = () => {
    toggleShowRegister((prev) => ({ ...prev, register: false }));
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      const email = emailRef.current.value;

      if (username.trim().length === 0)
        throw new Error('Username field cannot be empty');

      if (password.length === 0)
        throw new Error('Password field cannot be empty');

      if (password.length <= 5)
        throw new Error('Password field should have a minimum of 5 characters');

      if (email.length === 0) throw new Error('Email field cannot be empty');

      if (!email.includes('@') || !email.includes('.'))
        throw new Error('Enter a valid mail id');

      createNewUser({ username, password, email });
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      emailRef.current.value = '';
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-form-container">
      <span className="close">
        <span onClick={handleOnClose} className="material-icons">
          cancel
        </span>
      </span>
      <div className="register-image">
        <img src={globe} alt="Globe" />
      </div>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="form-heading">
            <div>
              Register
              <span className="material-icons room-icon">room</span>
            </div>
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
            <div className="form-field">
              <div>
                <span class="material-icons label-icon">mail</span>
              </div>
              <input
                type="email"
                placeholder="Email*"
                name="email"
                ref={emailRef}
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

export default Register;
