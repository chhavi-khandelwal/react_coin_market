import { FETCH_COINS, LOADING_DATA } from "../actionTypes";
import { LIMITER } from '../../shared/constants/constants';

const initialState = {
  coins: [],
  limit: LIMITER,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS: {
      return {
        ...state,
        coins: action.payload.coins,
        loading: false,
        limit: action.payload.limit
      }
    }

    case LOADING_DATA: {
      return { ...state, loading: true }
    }

    default: {
      return state;
    }
  }
};

export default reducer;
