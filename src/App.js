import React from 'react';
import Map from './components/Map/Map';
import UserLog from './components/UserLog/userLog';
import ToastNotifications from './components/Utilities/ToastNotifications';

const App = () => {
  return (
    <React.Fragment key="app">
      <Map />
      <UserLog />
      <ToastNotifications />
    </React.Fragment>
  );
};

export default App;
