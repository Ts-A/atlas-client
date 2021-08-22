import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Register from '../Forms/register';

const RegisterForm = (props) => {
  const { toggleShowRegister, createNewUser } = props;

  return (
    <React.Fragment key="register-form">
      <Backdrop />
      <Modal>
        <Register
          toggleShowRegister={toggleShowRegister}
          createNewUser={createNewUser}
        />
      </Modal>
    </React.Fragment>
  );
};

export default RegisterForm;
