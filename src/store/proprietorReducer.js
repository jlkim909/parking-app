const SET_PROPRIETOR = "SET_PROPRIETOR";
const CLEAR_PROPRIETOR = "CLEAR_PROPRIETOR";

export const setProprietor = (proprietor) => ({ type: SET_PROPRIETOR, currentProprietor: proprietor });
export const clearProprietor = () => ({ type: CLEAR_PROPRIETOR });

const initialState = {
  currentProprietor: null,
  isLoading: true,
};

const proprietorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPRIETOR:
      return {
        currentProprietor: action.currentProprietor,
        isLoading: false,
      };
    case CLEAR_PROPRIETOR:
      return {
        currentProprietor: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default proprietorReducer;