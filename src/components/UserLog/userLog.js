import React, { useEffect, useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import axios from 'axios';
import './userLog.css';
import { toast } from 'react-hot-toast';

const { REACT_APP_SERVER } = process.env;

const UserLog = (props) => {
  const [showForm, setShowForm] = useState({
    register: false,
    login: false,
  });

  const [userID, setUserID] = useState(localStorage.getItem('user_id'));

  useEffect(() => {}, [userID]);

  const createNewUser = async (data) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/signup`,
        { user: data }
      );
      const { token, user_id } = responseJSON.data;

      if (!token) throw new Error('Please try again later.');

      const userJSON = await axios.get(
        `${REACT_APP_SERVER}/api/user/${user_id}`,
        { headers: { authorization: token } }
      );

      const { user } = userJSON.data;

      toast.success(`Welcome, ${user.username}`);
      setShowForm((prev) => ({ ...prev, register: false }));
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('token', token);
      setUserID(user_id);
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
      const { token, user_id } = responseJSON.data;

      if (!token) throw new Error('Please try again later.');

      const userJSON = await axios.get(
        `${REACT_APP_SERVER}/api/user/${user_id}`,
        { headers: { authorization: token } }
      );

      const { user } = userJSON.data;

      toast.success(`Welcome back, ${user.username}`);
      setShowForm((prev) => ({ ...prev, login: false }));
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('token', token);
      setUserID(user_id);
    } catch (error) {
      toast.error(`Please check your credentials again!`);
      console.error(error.message);
    }
  };

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem('token');

      if (!token) throw new Error('Logout Failed');

      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/logout`,
        {},
        { headers: { Authorization: token } }
      );

      if (responseJSON.status !== 200) throw new Error('Logout Failed');

      toast.success(`Logout successful`);
      localStorage.clear('user_id');
      localStorage.clear('token');
      setUserID(null);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
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
        {userID ? (
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
