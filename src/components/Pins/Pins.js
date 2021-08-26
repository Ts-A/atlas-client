import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-map-gl';
import PopupCard from '../PopupCard/PopupCard';

const Pins = (props) => {
  const {
    pins,
    viewport,
    handleMarkerClick,
    showPopup,
    togglePopup,
    currentID,
  } = props;

  const markers = useMemo(
    () =>
      pins.map((pin) => {
        const { _id, latitude, longitude } = pin;
        return (
          <Marker
            key={_id}
            longitude={longitude}
            latitude={latitude}
            offsetLeft={-viewport.zoom * 3.5}
            offsetTop={-viewport.zoom * 7}
            onClick={() => handleMarkerClick(_id, latitude, longitude)}
          >
            <div>
              <span
                className="material-icons"
                style={{
                  fontSize: viewport.zoom * 7,
                }}
              >
                room
              </span>
            </div>
          </Marker>
        );
      }),
    [pins, viewport, handleMarkerClick]
  );

  const popups = pins.map((pin) => {
    const { latitude, longitude, _id } = pin;
    return (
      <div key={_id}>
        {showPopup && currentID === _id && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            closeButton={false}
            closeOnClick={false}
            anchor="left"
          >
            <PopupCard togglePopup={togglePopup} pin={pin} />
          </Popup>
        )}
      </div>
    );
  });

  return (
    <React.Fragment key="pins">
      {pins && markers}
      {pins && popups}
    </React.Fragment>
  );
};

export default Pins;
