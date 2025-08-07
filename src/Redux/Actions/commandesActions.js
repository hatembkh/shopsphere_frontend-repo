import axios from "axios"
import { HANDLEERROR } from "../ActionTypes/errorActionTypes"


import { ADDCOMMANDES, GETALLCOMMANDES, GETUSERSCOMMAND } from "../ActionTypes/commandessActionTypes"

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"


export const getAllCommandes =()=>async(dispatch)=>{
    try {
        const res = await axios.get(`${apiUrl}/Commandes/getAllCommandes`)

        dispatch(
            {
                type : GETALLCOMMANDES,
                payload : res.data.AllCommandes
            }
        )
    } catch (error) {
        
        dispatch(
            {
                type : HANDLEERROR,
                payload : error.response.data.errors
            }
        )
    }
}


export const addCommande = (newCommandes,navigate) => async (dispatch) => {
    try {
        
         await axios.post(`${apiUrl}/Commandes/AddCommande`, newCommandes);
        

        dispatch({ type: ADDCOMMANDES }); 
        
        navigate('/ListShopping')
    } catch (error) {
        
        dispatch({
            type: HANDLEERROR,
            payload: error.response?.data?.errors || "Unknown error"
        });
    }
};

export const deleteCommande =(id, callbackAction)=>async(dispatch)=>{
    try {
        
        await axios.delete(`${apiUrl}/Commandes/DeleteCommand/${id}`)

        dispatch(getUsersCommand())

    } catch (error) {
        dispatch(
            {
                type : HANDLEERROR,
                payload : error.response.data.errors
            }
        )
    }
    
}


export const updateCommandes=(id, upStatus)=>async(dispatch)=>{
    try {
       
        await axios.put(`${apiUrl}/Commandes/UpdateCommand/${id}`, upStatus )

         dispatch(getAllCommandes())
    } catch (error) {
        dispatch(
            {
                type : HANDLEERROR,
                payload : error.response.data.errors
            }
        )
    }
}

export const getUsersCommand=()=>async(dispatch)=>{
    try {
        const config = {
            headers : {
                Authorized : localStorage.getItem('token')
            }
        }
        const res = await axios.get(`${apiUrl}/Commandes/GetOneCommand`,config)
        console.log(res.data)
        dispatch(
            {
                type : GETUSERSCOMMAND,
                payload : res.data.GetUserCommandes
            }
        )
    } catch (error) {
        dispatch(
            {
                type : HANDLEERROR,
                payload : error.response.data.errors || 'Failed to load shopping cart'
            }
        )
    }
}
