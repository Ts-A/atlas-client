import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return (
    <React.Fragment key="modal">
      {ReactDOM.createPortal(
        props.children,
        document.getElementById('react-modal')
      )}
    </React.Fragment>
  );
};

export default Modal;
