import React, { useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import axios from 'axios';
import './userLog.css';
import { toast } from 'react-hot-toast';

const { REACT_APP_SERVER } = process.env;

const UserLog = (props) => {
  const { currentUser, setCurrentUser } = props;

  const [showForm, setShowForm] = useState({
    register: false,
    login: false,
  });

  const createNewUser = async (data) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/signup`,
        { user: data }
      );
      const { user } = responseJSON.data;
      toast.success(`Welcome, ${user.username}`);
      setShowForm((prev) => ({ ...prev, register: false }));
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user.username);
    } catch (error) {
      toast.error(`Please check your credentials again!`);
      console.error(error.message);
    }
  };

  const loginUser = async (data) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/login`,
        { user: data }
      );
      const { user } = responseJSON.data;
      toast.success(`Welcome back, ${user.username}`);
      setShowForm((prev) => ({ ...prev, login: false }));
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user.username);
    } catch (error) {
      toast.error(`Please check your credentials again!`);
      console.error(error.message);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success(`See ya later, ${currentUser}`);
    setCurrentUser(null);
    localStorage.clear('user');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowForm((prev) => ({ ...prev, login: false, register: true }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowForm((prev) => ({ ...prev, login: true, register: false }));
  };

  return (
    <React.Fragment key="user-log">
      <div className="user-log">
        {currentUser ? (
          <div className="buttons">
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="buttons">
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
        )}
      </div>
      {showForm.register && (
        <RegisterForm
          toggleShowRegister={setShowForm}
          createNewUser={createNewUser}
        />
      )}
      {showForm.login && (
        <LoginForm toggleShowLogin={setShowForm} loginUser={loginUser} />
      )}
    </React.Fragment>
  );
};

export default UserLog;
