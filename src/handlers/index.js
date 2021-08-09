// import { defaultNewPlace } from '../defaultStates';

// export const handleOnClose = (setNewPlace) => {
//   setNewPlace(defaultNewPlace);
// };

// export const handleMarkerClick = (
//   id,
//   latitude,
//   longitude,
//   togglePopup,
//   setCurrentID,
//   setViewport
// ) => {
//   togglePopup(true);
//   setCurrentID(id);
//   setViewport((prev) => ({ ...prev, latitude, longitude }));
// };

// export const handleDoubleClick = (e, setViewport, setNewPlace) => {
//   const [longitude, latitude] = e.lngLat;
//   setViewport((prev) => ({ ...prev, latitude, longitude }));
//   setNewPlace({ isSet: true, latitude, longitude });
// };
//
// export const formSubmitHandler = async (data) => {
//   try {
//     setNewPlace(defaultNewPlace);
//     data.username = currentUser;
//     data.latitude = newPlace.latitude;
//     data.longitude = newPlace.longitude;
//     const responseJSON = await axios.post(`${REACT_APP_SERVER}/api/pin/`, {
//       ...data,
//     });
//     console.log(responseJSON);
//     setPins((prev) => [...prev, responseJSON.data.pin]);
//   } catch (error) {
//     console.error(error.message);
//   }
// };
