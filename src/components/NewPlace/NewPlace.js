import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import PinForm from '../PinForm/pinForm';
import { createApi } from 'unsplash-js';
import axios from 'axios';

const {
  REACT_APP_OPENCAGE_KEY,
  REACT_APP_OPENCAGE_API_FORWARD,
  REACT_APP_UNSPLASH_API,
} = process.env;

const unsplashAPI = new createApi({
  accessKey: REACT_APP_UNSPLASH_API,
  fetch: fetch,
});

const NewPlace = (props) => {
  const { viewport, newPlace, formSubmitHandler, handleOnClose } = props;

  const [place, setPlace] = useState({
    isSet: false,
    data: '',
    relatedImages: [],
  });

  useEffect(() => {
    try {
      const findCoordinates = async ({ latitude, longitude }) => {
        try {
          const responseJSON = await axios.get(
            `${REACT_APP_OPENCAGE_API_FORWARD}?q=${latitude},${longitude}&key=${REACT_APP_OPENCAGE_KEY}&language=en&pretty=1&limit=5`
          );

          const { data } = responseJSON;

          setPlace((prev) => ({ ...prev, isSet: true, data: data.results }));

          const searchQuery = responseJSON.data.results[0].components.country;
          const photos = await unsplashAPI.search.getPhotos({
            query: searchQuery,
            page: 1,
            perPage: 5,
            orderBy: 'relevant',
          });

          setPlace((prev) => ({
            ...prev,
            relatedImages: photos.response.results,
          }));

          return true;
        } catch (error) {
          console.error(error);
        }
      };
      findCoordinates(newPlace);
    } catch (error) {
      console.error(error.message);
    }
  }, [newPlace]);

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
            <PinForm place={place} submitHandler={formSubmitHandler} />
          </Popup>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewPlace;
