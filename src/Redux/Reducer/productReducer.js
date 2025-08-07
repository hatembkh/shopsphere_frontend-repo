import { ADDNEWPRODUCT, GETALLPRODUCTS, GETONEPRODUCT } from "../ActionTypes/productActionTypes"

const initialState = {
    products : [],
    product : {}
    
}


const ProductReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GETALLPRODUCTS : return {...state , products : action.payload}
       
        case ADDNEWPRODUCT :
            console.log('Current state:', state);
            console.log('New state will be:', {...state, products: [...state.products, action.payload]});
             return{...state, products : [...state.products , action.payload]}

        case GETONEPRODUCT : return {...state , product : action.payload}

        default: return state
    }
}

export default ProductReducer