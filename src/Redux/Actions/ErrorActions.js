import { CLEARALL, CLEARERROR, HANDLEERROR, START_ERROR_REMOVAL } from "../ActionTypes/errorActionTypes"

export const handleError = (error) => async (dispatch) => {

    const id = Date.now()

    const message = typeof error === 'string'
        ? error
        : error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to load shopping cart';
        
    dispatch(
        {
            type: HANDLEERROR,
            payload: { msg: message, id }
        }
    )
    
    setTimeout(() => {
        // Dispatch removal 300ms before actual removal for animation
        dispatch({ type: START_ERROR_REMOVAL, payload: id });

        setTimeout(() => {
            dispatch({ type: CLEARERROR, payload: id });
        }, 300); // Matches animation duration
    }, 5700); // 3000ms total - 300ms animation
}

export const clearAll = () => {
    return (
        {
            type: CLEARALL
        }
    )
}