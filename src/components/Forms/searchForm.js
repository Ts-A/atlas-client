import { useRef } from 'react';
import axios from 'axios';
import CountriesSelect from './CountriesSelect';
import { createApi } from 'unsplash-js';

const {
  REACT_APP_OPENCAGE_KEY,
  REACT_APP_OPENCAGE_API_FORWARD,
  REACT_APP_UNSPLASH_API,
} = process.env;

const unsplashAPI = new createApi({
  accessKey: REACT_APP_UNSPLASH_API,
  fetch: fetch,
});

const SearchForm = () => {
  const searchRef = useRef();
  const countryRef = useRef();

  const findCoordinates = async (searchQuery) => {
    try {
      const countryCode = countryRef.current.value.toLowerCase();
      const responseJSON = await axios.get(
        `${REACT_APP_OPENCAGE_API_FORWARD}?q=${searchQuery}&key=${REACT_APP_OPENCAGE_KEY}&language=en&pretty=1&limit=1&countrycode=${countryCode}`
      );
      console.log(responseJSON.data.results[0].geometry);
      console.log(responseJSON.data.results[0].formatted);
      console.log(responseJSON.data.results[0].annotations);
      console.log(responseJSON.data.results[0].components);
      console.log(responseJSON.status);

      const photos = await unsplashAPI.search.getPhotos({
        query: searchQuery,
        page: 1,
        perPage: 5,
        orderBy: 'relevant',
      });

      console.log(photos.response.results[0].urls.raw);
      console.log(photos.response);
      console.log(photos.status);
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
    <form onSubmit={handleSearch} style={{ backgroundColor: 'black' }}>
      <input
        type="text"
        placeholder="enter a place to search"
        ref={searchRef}
      />
      <CountriesSelect countryRef={countryRef} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
