import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PopupCard from '../PopupCard/PopupCard';
import axios from 'axios';

const { REACT_APP_MAPBOX, REACT_APP_MAP, REACT_APP_SERVER } = process.env;

const Map = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    try {
      const getPins = async () => {
        const response = await axios.get(`${REACT_APP_SERVER}/api/pin`);
        setPins(response.data.pins);
      };
      getPins();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleMarkerClick = (id) => {
    togglePopup(true);
    setCurrentID(id);
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
            onClick={() => handleMarkerClick(_id)}
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

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28,
    longitude: 80,
    zoom: 4,
  });

  const [currentID, setCurrentID] = useState(null);
  const [showPopup, togglePopup] = useState(false);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={REACT_APP_MAPBOX}
      mapStyle={REACT_APP_MAP}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {pins && displayMarkers()}
    </ReactMapGL>
  );
};

export default Map;
