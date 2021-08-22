import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Login from '../Forms/login';

const LoginForm = (props) => {
  const { toggleShowLogin, loginUser } = props;

  return (
    <React.Fragment key="login-form">
      <Backdrop />
      <Modal>
        <Login toggleShowLogin={toggleShowLogin} loginUser={loginUser} />
      </Modal>
    </React.Fragment>
  );
};

export default LoginForm;
