import { FETCH_COINS, LOADING_DATA } from './actionTypes';
import { CMC_PRO_API_KEY, COINMARKET_API, QS } from '../shared/constants/constants'

export const fetchCoins = (limit) => {
  
  return (dispatch, state) => {
    limit = limit || state().reducer.limit;
    dispatch({ type: LOADING_DATA });
    
    //fetch coins from API
    fetch(`${ COINMARKET_API }?start=${ QS.start }&limit=${ limit }&convert=${ QS.convert }`, { 
      method: 'GET', 
      headers: {
        'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY
      }
    }).then(response => {		
      response.json().then(
        payload => {
          dispatch({ 
            type: FETCH_COINS,
            payload: { coins: payload.data, limit } 
          });
        }
      );
    });
  }
}
