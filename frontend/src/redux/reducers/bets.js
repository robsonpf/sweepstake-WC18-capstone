import decode from 'jwt-decode';
import {
   POST_BET_PENDING,
   POST_BET_SUCCESS,
   POST_BET_FAILED
} from '../actions/bets';

let postInitialState = (payload) => {
    let initialState = {
        isLoading: false,
        showPostError: false,
        message: "",
        // user: jwt_payload,
        bets: [],
        isValid: true,
        isValidForm: true
    };
    console.log("initialState ", initialState);

    return initialState
};

let initialState = {
    isLoading: false,
    isValid: true,
    message: "",
    // user: jwt_payload,
    bets: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case POST_BET_PENDING:
            return { ...state, isLoading: true };
        case POST_BET_SUCCESS:
            return {   ...state, isLoading: false, isValid: true, bets: [ ...payload ] }
        case POST_BET_FAILED:
            return { ...state, isLoading: true, isValid: false, matchId: payload}
        default:
            return state
    }
}
