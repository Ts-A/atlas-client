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

const { REACT_APP_MAPBOX, REACT_APP_MAP, REACT_APP_SERVER } = process.env;

const Map = () => {
  const [pins, setPins] = useState(defaultPinsState);
  const [newPlace, setNewPlace] = useState(defaultNewPlace);
  const [viewport, setViewport] = useState(defaultViewport);

  const [currentID, setCurrentID] = useState(null);
  const [showPopup, togglePopup] = useState(false);
  const [currentUser] = useState('Ajeet');

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
    </ReactMapGL>
  );
};

export default Map;
