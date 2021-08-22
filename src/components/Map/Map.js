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
import SearchForm from '../Forms/searchForm';
import { useCurrentWidth, useCurrentHeight } from '../../Helpers/Resize';

const { REACT_APP_MAPBOX, REACT_APP_MAP, REACT_APP_SERVER } = process.env;

const Map = (props) => {
  const { currentUser, setCurrentUser } = props;

  const [pins, setPins] = useState(defaultPinsState);
  const [newPlace, setNewPlace] = useState(defaultNewPlace);
  const [viewport, setViewport] = useState(defaultViewport);
  const [currentID, setCurrentID] = useState(null);
  const [showPopup, togglePopup] = useState(false);

  const formSubmitHandler = async (data) => {
    try {
      setNewPlace(defaultNewPlace);
      data.username = currentUser;
      data.latitude = newPlace.latitude;
      data.longitude = newPlace.longitude;
      const responseJSON = await axios.post(`${REACT_APP_SERVER}/api/pin/`, {
        pin: data,
      });
      console.log(responseJSON);
      setPins((prev) => [...prev, responseJSON.data.pin]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    const parsedUser = JSON.parse(userJSON);
    console.log(parsedUser);
    setCurrentUser(parsedUser);
  }, [setCurrentUser]);

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
  }, []);

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

  const handleSearchSubmit = (latitude, longitude) => {
    setViewport((prev) => ({ ...prev, latitude, longitude, zoom: 10 }));
  };

  return (
    <ReactMapGL
      {...viewport}
      width={useCurrentWidth()}
      height={useCurrentHeight()}
      mapboxApiAccessToken={REACT_APP_MAPBOX}
      mapStyle={REACT_APP_MAP}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={handleDoubleClick}
      transitionDuration={300}
    >
      <Pins
        pins={pins}
        viewport={viewport}
        handleMarkerClick={handleMarkerClick}
        showPopup={showPopup}
        togglePopup={togglePopup}
        currentID={currentID}
      />
      {newPlace.isSet && (
        <NewPlace
          viewport={viewport}
          newPlace={newPlace}
          formSubmitHandler={formSubmitHandler}
          handleOnClose={handleOnClose}
        />
      )}
      <SearchForm handleSearchSubmit={handleSearchSubmit} viewport={viewport} />
    </ReactMapGL>
  );
};

export default Map;
