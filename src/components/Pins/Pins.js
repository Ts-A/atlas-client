import React from 'react';
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
  return (
    <React.Fragment key="pins">
      {pins &&
        pins.map((pin) => {
          const { latitude, longitude, _id } = pin;
          return (
            <div key={_id}>
              <Marker
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-viewport.zoom * 3.5}
                offsetTop={-viewport.zoom * 7}
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
        })}
    </React.Fragment>
  );
};

export default Pins;
