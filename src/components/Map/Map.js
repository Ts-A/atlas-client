import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PopupCard from '../PopupCard/PopupCard';

const { REACT_APP_MAPBOX, REACT_APP_MAP } = process.env;

function Map() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28,
    longitude: 80,
    zoom: 4,
  });

  const [showPopup, togglePopup] = React.useState(false);

  const handleMarkerClick = () => {
    togglePopup(true);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={REACT_APP_MAPBOX}
      mapStyle={REACT_APP_MAP}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker
        latitude={28}
        longitude={80}
        offsetLeft={-20}
        offsetTop={-10}
        onClick={handleMarkerClick}
      >
        <div>
          <span class="material-icons" style={{ fontSize: viewport.zoom * 7 }}>
            room
          </span>
        </div>
      </Marker>
      {showPopup && (
        <Popup
          latitude={28}
          longitude={80}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="left"
        >
          <PopupCard />
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
