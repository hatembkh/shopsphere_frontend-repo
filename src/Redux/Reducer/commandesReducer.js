// import { GETALLCOMMENTS } from "../ActionTypes/commentsActionTypes"

import { ADDCOMMANDES, GETALLCOMMANDES, GETUSERSCOMMAND } from "../ActionTypes/commandessActionTypes"


const initialState = {
    commandes : [],
    usercommandes : [],
    success : false,
}


const CommandesReducer=(state = initialState, action)=>{
    switch (action.type) {
        // case GETALLCOMMENTS: return {...state, comments : action.payload}
        case ADDCOMMANDES : return {...state, success : true}
        case GETALLCOMMANDES : return {...state, commandes : action.payload}
        case GETUSERSCOMMAND : return {...state, usercommandes : action.payload }
        default: return state
    }
}

export default CommandesReducer