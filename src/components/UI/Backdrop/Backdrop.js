import React from 'react';
import ReactDOM from 'react-dom';
import './backdrop.css';

const Backdrop = () => {
  return (
    <React.Fragment key="backdrop">
      {ReactDOM.createPortal(
        <div className="backdrop"></div>,
        document.getElementById('react-backdrop')
      )}
    </React.Fragment>
  );
};

export default Backdrop;
