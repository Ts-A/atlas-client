import React, { useState } from 'react';
import Map from './components/Map/Map';
import UserLog from './components/UserLog/userLog';
import ToastNotifications from './components/Utilities/ToastNotifications';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <React.Fragment key="app">
      <Map currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <UserLog currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <ToastNotifications />
    </React.Fragment>
  );
};

export default App;
