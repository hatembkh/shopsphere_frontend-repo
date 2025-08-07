import { CLEARALL, CLEARERROR, HANDLEERROR, START_ERROR_REMOVAL } from "../ActionTypes/errorActionTypes"

const initialState = [];

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLEERROR:
      return [...state, { ...action.payload, removing: false }];
      
    case START_ERROR_REMOVAL:
      return state.map(error => 
        error.id === action.payload 
          ? { ...error, removing: true } 
          : error
      );
      
    case CLEARERROR:
      return state.filter(error => error.id !== action.payload);
      
    case CLEARALL:
      return [];
      
    default:
      return state;
  }
};
export default ErrorReducer



















// import { CLEARALL, CLEARERROR, HANDLEERROR } from "../ActionTypes/errorActionTypes"

// const initiialState = []

// const ErrorReducer = (state = initiialState, action)=>{
//     switch (action.type) {
        
//         case HANDLEERROR :
//             console.log('Adding error:', action.payload)
//              return [...state , action.payload]
        
//         case CLEARERROR :
//             console.log('Clearing error with id:', action.payload)
//              return state.filter((el)=> el.id !== action.payload)

//         case CLEARALL : return []
//         default: return state
//     }
// }

// export default ErrorReducer