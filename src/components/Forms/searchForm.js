import React, { useRef, useState } from 'react';
import axios from 'axios';
import CountriesSelect from './CountriesSelect';
import { createApi } from 'unsplash-js';
import './searchForm.css';
import MarkSearchedPlace from '../MarkSearchedPlace/MarkSearchedPlace';
import { defaultPlaceData } from '../../defaultStates';

const {
  REACT_APP_OPENCAGE_KEY,
  REACT_APP_OPENCAGE_API_FORWARD,
  REACT_APP_UNSPLASH_API,
} = process.env;

const unsplashAPI = new createApi({
  accessKey: REACT_APP_UNSPLASH_API,
  fetch: fetch,
});

const SearchForm = (props) => {
  const searchRef = useRef();
  const countryRef = useRef();

  const { handleSearchSubmit, viewport } = props;

  const [menuOpen, toggleMenuOpen] = useState(false);
  const [placeData, setPlaceData] = useState(defaultPlaceData);

  const handleCloseSearchedPlace = () => {
    setPlaceData(defaultPlaceData);
  };

  const findCoordinates = async (searchQuery) => {
    try {
      const countryCode = countryRef.current.value.toLowerCase();
      const responseJSON = await axios.get(
        `${REACT_APP_OPENCAGE_API_FORWARD}?q=${searchQuery}&key=${REACT_APP_OPENCAGE_KEY}&language=en&pretty=1&limit=1&countrycode=${countryCode}`
      );

      if (responseJSON.status !== 200)
        throw new Error(
          responseJSON.statusText ||
            `OpenCage server down, please try again later`
        );

      const { results } = responseJSON.data;

      const { components, geometry, annotations, formatted } = results[0];

      const responseData = {
        isSet: true,
        data: {
          latitude: geometry.lat,
          longitude: geometry.lng,
          about: formatted,
          flag: annotations.flag,
          city: components.city,
          country: components.country,
        },
        hasImages: false,
        imageURLs: [],
      };

      const locationPhotos = await unsplashAPI.search.getPhotos({
        query: formatted,
        page: 1,
        perPage: 3,
        orderBy: 'relevant',
      });

      const cityPhotos = await unsplashAPI.search.getPhotos({
        query: components.city,
        page: 1,
        perPage: 3,
        orderBy: 'relevant',
      });

      const countryPhotos = await unsplashAPI.search.getPhotos({
        query: components.country,
        page: 1,
        perPage: 3,
        orderBy: 'relevant',
      });

      if (cityPhotos.status === 200) {
        responseData.hasImages = true;

        for (let i = 0; i < cityPhotos.response.results.length; ++i)
          responseData.imageURLs.push(cityPhotos.response.results[i].urls.raw);
      }

      if (countryPhotos.status === 200) {
        responseData.hasImages = true;

        for (let i = 0; i < countryPhotos.response.results.length; ++i)
          responseData.imageURLs.push(
            countryPhotos.response.results[i].urls.raw
          );
      }
      if (locationPhotos.status === 200) {
        responseData.hasImages = true;

        for (let i = 0; i < locationPhotos.response.results.length; ++i)
          responseData.imageURLs.push(
            locationPhotos.response.results[i].urls.raw
          );
      }
      setPlaceData(responseData);
      handleSearchSubmit(
        responseData.data.latitude,
        responseData.data.longitude
      );
      searchRef.current.value = '';
      countryRef.current.value = '';
      toggleMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = searchRef.current.value;
    findCoordinates(searchQuery);
  };

  return (
    <React.Fragment key="form-container">
      {menuOpen ? (
        <div className={'form-container'}>
          <div className="icon" onClick={() => toggleMenuOpen(false)}>
            <span className="material-icons menu">close</span>
          </div>
          <form onSubmit={handleSearch} className={'search-form'}>
            <div className="form-title">SEARCH ANY PLACE</div>
            <input
              type="text"
              placeholder="enter a place to search"
              ref={searchRef}
            />
            <CountriesSelect countryRef={countryRef} />
            <button type="submit">Search</button>
            {placeData.isSet && console.log(placeData)}
          </form>
        </div>
      ) : (
        <div className="icon" onClick={() => toggleMenuOpen(true)}>
          <span className="material-icons menu">menu</span>
        </div>
      )}
      {placeData.isSet && (
        <MarkSearchedPlace
          viewport={viewport}
          handleCloseSearchedPlace={handleCloseSearchedPlace}
          placeData={placeData}
        />
      )}
    </React.Fragment>
  );
};

export default SearchForm;
