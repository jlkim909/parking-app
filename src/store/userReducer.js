const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";
const SET_MODE = "SET_MODE";

export const setUser = (user) => ({ type: SET_USER, currentUser: user });
export const clearUser = () => ({ type: CLEAR_USER });
export const setMode = (mode) => ({type:SET_MODE, currentMode:mode})

const initialState = {
  currentUser: null,
  isLoading: true,
  mode:"CLIENT"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        phoneNum:action.phoneNum,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    case SET_MODE:
      return {
        ...state,
        mode:action.currentMode,
      };
    default:
      return{
        ...state
      }
  }
};

export default userReducer;