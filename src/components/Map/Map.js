import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import axios from 'axios';
import NewPlace from '../NewPlace/NewPlace';
import Pins from '../Pins/Pins';
import {
  defaultNewPlace,
  defaultViewport,
  defaultPinsState,
} from '../../defaultStates';
import './map.css';
import Register from '../Forms/register';
import Login from '../Forms/login';

const { REACT_APP_MAPBOX, REACT_APP_MAP, REACT_APP_SERVER } = process.env;

const Map = () => {
  const [pins, setPins] = useState(defaultPinsState);
  const [newPlace, setNewPlace] = useState(defaultNewPlace);
  const [viewport, setViewport] = useState(defaultViewport);
  const [showRegister, toggleShowRegister] = useState(false);
  const [showLogin, toggleShowLogin] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [showPopup, togglePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const formSubmitHandler = async (data) => {
    try {
      setNewPlace(defaultNewPlace);
      data.username = currentUser;
      data.latitude = newPlace.latitude;
      data.longitude = newPlace.longitude;
      const responseJSON = await axios.post(`${REACT_APP_SERVER}/api/pin/`, {
        ...data,
      });
      console.log(responseJSON);
      setPins((prev) => [...prev, responseJSON.data.pin]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createNewUser = async (data, setSuccess, setError) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/signup`,
        { ...data }
      );
      setError(false);
      setSuccess(true);
      setCurrentUser(responseJSON.data.user.username);
      console.log(responseJSON);
    } catch (error) {
      setSuccess(false);
      setError(true);
      console.error(error.message);
    }
  };

  const loginUser = async (data, setSuccess, setError) => {
    try {
      const responseJSON = await axios.post(
        `${REACT_APP_SERVER}/api/user/login`,
        { ...data }
      );
      setError(false);
      setSuccess(true);
      setCurrentUser(responseJSON.data.user.username);
      console.log(responseJSON);
    } catch (error) {
      setSuccess(false);
      setError(true);
      console.error(error.message);
    }
  };

  useEffect(() => {
    try {
      const getPins = async () => {
        const response = await axios.get(`${REACT_APP_SERVER}/api/pin/`);
        setPins(response.data.pins);
      };
      getPins();
    } catch (error) {
      console.error(error.message);
    }
  }, [pins]);

  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser(null);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    toggleShowLogin(false);
    toggleShowRegister(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toggleShowRegister(false);
    toggleShowLogin(true);
  };

  const handleOnClose = () => {
    setNewPlace(defaultNewPlace);
  };

  const handleMarkerClick = (id, latitude, longitude) => {
    togglePopup(true);
    setCurrentID(id);
    setViewport((prev) => ({ ...prev, latitude, longitude }));
  };

  const handleDoubleClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setViewport((prev) => ({ ...prev, latitude, longitude }));
    setNewPlace({ isSet: true, latitude, longitude });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={REACT_APP_MAPBOX}
      mapStyle={REACT_APP_MAP}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={handleDoubleClick}
      transitionDuration={700}
    >
      <Pins
        pins={pins}
        viewport={viewport}
        handleMarkerClick={handleMarkerClick}
        showPopup={showPopup}
        togglePopup={togglePopup}
        currentID={currentID}
      />
      <NewPlace
        viewport={viewport}
        newPlace={newPlace}
        formSubmitHandler={formSubmitHandler}
        handleOnClose={handleOnClose}
      />
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
      {showRegister && (
        <Register
          toggleShowRegister={toggleShowRegister}
          createNewUser={createNewUser}
        />
      )}
      {showLogin && (
        <Login toggleShowLogin={toggleShowLogin} loginUser={loginUser} />
      )}
    </ReactMapGL>
  );
};

export default Map;
