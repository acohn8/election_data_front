import axios from 'axios';

const fetchCountyDetails = countyId => async (dispatch, getState) => {
  const response = await axios.get(`https://election-data-2016.herokuapp.com/api/v1/states/${
    getState().states.activeStateId
  }/counties/${countyId}`);
  const {
    id, details, name, latitude, longitude, fips, images, url,
  } = response.data;
  dispatch({
    type: 'SET_COUNTY_INFO',
    id,
    details,
    name,
    latitude,
    longitude,
    fips,
    images,
    url,
  });
};

const resetCountyDetails = () => dispatch => dispatch({ type: 'RESET_COUNTY_INFO' });

export { fetchCountyDetails, resetCountyDetails };
