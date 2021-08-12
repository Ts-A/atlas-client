import React, { useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import axios from 'axios';
import './userLog.css';
import { Toaster, toast } from 'react-hot-toast';

const { REACT_APP_SERVER } = process.env;

const UserLog = (props) => {
  const { currentUser, setCurrentUser } = props;

  const [showForm, setShowForm] = useState({
    register: false,
    login: false,
  });

  const createNewUser = async (data, setSuccess, setError) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/signup`,
        { user: data }
      );
      const { user } = responseJSON.data;
      toast.success(`Welcome, ${user.username}`);
      setError(false);
      setSuccess(true);
      setShowForm((prev) => ({ ...prev, register: false }));
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user.username);
    } catch (error) {
      setSuccess(false);
      toast.error(`Please check your credentials again!`);
      setError(true);
      console.error(error.message);
    }
  };

  const loginUser = async (data, setSuccess, setError) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/login`,
        { user: data }
      );
      const { user } = responseJSON.data;
      toast.success(`Welcome back, ${user.username}`);
      setError(false);
      setSuccess(true);
      setShowForm((prev) => ({ ...prev, login: false }));
      const userJSON = JSON.stringify(user);
      localStorage.setItem('user', userJSON);
      setCurrentUser(user.username);
    } catch (error) {
      setSuccess(false);
      setError(true);
      toast.error(`Please check your credentials again!`);
      console.error(error.message);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
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
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />
    </React.Fragment>
  );
};

export default UserLog;
