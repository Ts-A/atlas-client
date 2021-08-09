import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PopupCard from '../PopupCard/PopupCard';
import axios from 'axios';
import PinForm from '../PinForm/pinForm';

const { REACT_APP_MAPBOX, REACT_APP_MAP, REACT_APP_SERVER } = process.env;

const Map = () => {
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState({
    isSet: false,
    latitude: 0,
    longitude: 0,
  });
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28,
    longitude: 80,
    zoom: 4,
  });

  const [currentID, setCurrentID] = useState(null);
  const [showPopup, togglePopup] = useState(false);
  const [currentUser] = useState('Ajeet');

  const formSubmitHandler = async (data) => {
    try {
      setNewPlace({ isSet: false });
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
    setNewPlace({ isSet: false });
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

  const displayMarkers = () =>
    pins.map((pin) => {
      const {
        // createdAt,
        // description,
        latitude,
        longitude,
        // rating,
        // title,
        // username,
        _id,
      } = pin;

      return (
        <div key={_id}>
          <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-20}
            offsetTop={-10}
            onClick={() => handleMarkerClick(_id, latitude, longitude)}
          >
            <div>
              <span
                className="material-icons"
                style={{ fontSize: viewport.zoom * 7 }}
              >
                room
              </span>
            </div>
          </Marker>
          {showPopup && currentID === _id && (
            <Popup
              latitude={latitude}
              longitude={longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => togglePopup(false)}
              anchor="left"
            >
              <PopupCard pin={pin} />
            </Popup>
          )}
        </div>
      );
    });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={REACT_APP_MAPBOX}
      mapStyle={REACT_APP_MAP}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={handleDoubleClick}
      transitionDuration={300}
    >
      {pins && displayMarkers()}
      {newPlace.isSet && (
        <div>
          <Marker
            latitude={newPlace.latitude}
            longitude={newPlace.longitude}
            offsetLeft={-viewport.zoom * 3.5}
            offsetTop={-viewport.zoom * 7}
          >
            <div>
              <span
                className="material-icons"
                style={{ fontSize: viewport.zoom * 7 }}
              >
                room
              </span>
            </div>
          </Marker>
          <Popup
            latitude={newPlace.latitude}
            longitude={newPlace.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={handleOnClose}
            anchor="left"
          >
            <PinForm submitHandler={formSubmitHandler} />
          </Popup>
        </div>
      )}
    </ReactMapGL>
  );
};

export default Map;
