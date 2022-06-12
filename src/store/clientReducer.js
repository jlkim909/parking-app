const SET_DATA = "SET_DATA";


export const setData = (data) => ({type:SET_DATA, currentData:data})

const initialState = {
  code:null,
  name:null,
  phoneNumber:null,
  ticket:[],
  gitBox:[],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data:action.currentData,
      };  
    default:
      return state;
  }
};

export default clientReducer;