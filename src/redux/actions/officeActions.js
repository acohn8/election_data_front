import axios from 'axios';

import { setActiveState } from './stateActions';

const fetchOfficesList = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3000/api/v1/offices');
  dispatch({ type: 'SET_OFFICES', offices: response.data.data });
};

const fetchStateOffices = () => async (dispatch, getState) => {
  const response = await axios.get(`http://localhost:3000/api/v1/states/${getState().states.activeStateId}/offices`);
  dispatch({ type: 'SET_OFFICES', offices: response.data.data });
};

const setActiveOffice = (officeId = '308') => async (dispatch, getState) => {
  dispatch({ type: 'SET_ACTIVE_OFFICE', officeId });
  getState().states.activeStateId !== null &&
    dispatch(setActiveState(getState().states.activeStateId, true));
};

const resetOffice = () => dispatch => dispatch({ type: 'RESET_OFFICE' });

export { fetchOfficesList, setActiveOffice, fetchStateOffices, resetOffice };