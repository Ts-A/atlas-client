import React, { useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

const MarkSearchedPlace = (props) => {
  const { placeData, viewport, handleCloseSearchedPlace } = props;

  const imageRef = useRef();
  let interval;

  const [open, toggleOpen] = useState(true);

  const handleOnClose = () => {
    clearInterval(interval);
    toggleOpen(false);
    handleCloseSearchedPlace();
  };

  const setAlternateImages = (imageList) => {
    console.log(imageRef);
    let prevIndex = 5;
    let curr = 0;
    interval = setInterval(() => {
      do {
        curr = Math.floor(Math.random() * imageList.length);
      } while (prevIndex === curr && curr < imageList.length);

      console.log('running');

      if (imageRef?.current?.src) imageRef.current.src = imageList[curr];
      console.log(imageList[curr]);
      prevIndex = curr;
    }, 2000);
    console.log('started');
  };

  useEffect(() => {
    if (open && placeData.hasImages) setAlternateImages(placeData.imageURLs);
  }, []);

  return open ? (
    <React.Fragment key="mark-searched-places">
      <Marker
        latitude={placeData.data.latitude}
        longitude={placeData.data.longitude}
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
        latitude={placeData.data.latitude}
        longitude={placeData.data.longitude}
        closeButton={true}
        closeOnClick={false}
        onClose={handleOnClose}
        anchor="left"
      >
        <form className="pinform">
          <div className="form-image">
            {placeData.isSet && (
              <img
                ref={imageRef}
                height="200px"
                width="200px"
                src="https://ak.picdn.net/shutterstock/videos/28831216/thumb/1.jpg"
                alt={'loading...'}
              />
            )}
          </div>
          <div className="form-inputs">
            <div className="field">
              {placeData.data.flag}
              {placeData.data.city}
              {placeData.data.country}
            </div>
            <div className="field">{placeData.data.about}</div>
            <div className="field">
              <label>latitude</label>
              <div>{placeData.data.latitude}</div>
              <label>longitude</label>
              <div>{placeData.data.longitude}</div>
            </div>
          </div>
        </form>
      </Popup>
    </React.Fragment>
  ) : (
    <></>
  );
};

export default MarkSearchedPlace;
