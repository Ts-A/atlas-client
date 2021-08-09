import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import PinForm from '../PinForm/pinForm';

const NewPlace = (props) => {
  const { viewport, newPlace, formSubmitHandler, handleOnClose } = props;

  return (
    <React.Fragment key="new-place">
      {newPlace.isSet && (
        <React.Fragment key="marker-popup">
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewPlace;
