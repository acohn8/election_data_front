import axios from 'axios';
import { normalize } from 'normalizr';
import { push } from 'connected-react-router';

import { stateCounties, candidateListSchema, resultListSchema } from './schema';

const fetchStateData = stateId => async (dispatch) => {
  dispatch({ type: 'LOADING' });
  const url = 'http://localhost:3000/api/v1';
  const response = await Promise.all([
    axios.get(`${url}/states/${stateId}/counties`),
    axios.get(`${url}/states/${stateId}/candidates`),
    axios.get(`${url}/states/${stateId}/results`),
  ]);

  const geography = normalize(response[0].data, stateCounties);
  const electionResults = normalize(response[2].data.results, resultListSchema);
  const candidates = normalize(response[1].data.data, candidateListSchema);

  dispatch({
    type: 'SET_STATE_DATA',
    geography,
    candidates,
    electionResults,
  });

  dispatch(push(`/states/${stateId}`));
};

export { fetchStateData };
