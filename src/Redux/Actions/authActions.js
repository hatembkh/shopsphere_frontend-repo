import { CURRENT, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, FAIL, GETALLUSERS, LOGIN, LOGOUT, REGISTER, REGISTER_REQUEST } from "../ActionTypes/authActionTypes"
import axios from "axios"
import { handleError } from "./ErrorActions"
import { toast } from 'react-toastify';


const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"


export const register = (regUser, navigate) => async (dispatch) => {
    try {

        dispatch({type: REGISTER_REQUEST})

        const formData = new FormData()
        formData.append('name', regUser.name)
        formData.append('email', regUser.email)
        formData.append('password', regUser.password)
        formData.append('adress', regUser.adress)
        formData.append('phoneNumber', regUser.phoneNumber)
        if (regUser.imageFile) {
            formData.append('image', regUser.imageFile)
        }
        

        const res = await axios.post(`${apiUrl}/auth/Register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const { token, newUser } = res.data

        localStorage.setItem('token', token)



        dispatch(
            {
                type: REGISTER,
                payload: { token, newUser }
            }
        )

        toast.success('Account Created successfully!');

        setTimeout (()=>{
            navigate('/Profil')
        },1000)
        
    } catch (error) {

        error.response?.data?.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const login = (logUser, navigate) => async (dispatch) => {
    try {
        console.log('API URL:', `${apiUrl}/auth/SignIn`)
        const res = await axios.post(`${apiUrl}/auth/SignIn`, logUser)

        const { token, found } = res.data

        localStorage.setItem('token', token)

        dispatch(
            {
                type: LOGIN,
                payload: { token, found }
            }
        )

        navigate('/Profil')
    } catch (error) {
        if (error.response) {
            // Check if it's a 404 (wrong endpoint)
            if (error.response.status === 404) {
                dispatch(handleError('Login endpoint not found. Please check the server URL.'))
                return
            }

            // Handle other API errors
            if (error.response.data?.errors) {
                error.response.data.errors.forEach(element => {
                    dispatch(handleError(element.msg))
                })
            } else if (error.response.data?.message) {
                dispatch(handleError(error.response.data.message))
            } else {
                dispatch(handleError('Login failed. Please try again.'))
            }
        } else if (error.request) {
            // The request was made but no response received
            dispatch(handleError('Network error. Please check your connection.'))
        } else {
            // Something happened in setting up the request
            dispatch(handleError('Login failed. Please try again.'))
        }
    }
    }


export const current = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorized: localStorage.getItem('token')
            }
        }
        const res = await axios.get(`${apiUrl}/auth/currentUser`, config)
        dispatch(
            {
                type: CURRENT,
                payload: res.data
            }
        )
    } catch (error) {
        dispatch(
            {
                type: FAIL,
                payload: error.response.data.errors
            }
        )
    }
}

export const logout = () => (dispatch) => {

    localStorage.removeItem('token')

    dispatch({ type: LOGOUT })
}

export const editUser = (id, updatedUser, navigate) => async (dispatch) => {
    try {

        dispatch({ type: EDIT_USER_REQUEST })

        const formData = new FormData()
        formData.append('name', updatedUser.name)
        formData.append('email', updatedUser.email)
        formData.append('adress', updatedUser.adress)
        formData.append('phoneNumber', updatedUser.phoneNumber)

        if (updatedUser.imageFile) {
            formData.append('image', updatedUser.imageFile)
        }


        const response = await axios.put(`${apiUrl}/auth/EditUser/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        dispatch(
            {
                type: EDIT_USER_SUCCESS,
                payload: response.data.user || response.data
            }
        )
        dispatch(current()) 

        toast.success('Profile updated successfully!');

        setTimeout(() => {
            navigate('/Profil');
        }, 1000);

    } catch (error) {
        dispatch(
            {
                type: EDIT_USER_FAIL,
                payload: error.response?.data?.errors || [{ msg: error.message || 'Something went wrong' }]
            }
        )

        const errors = error.response?.data?.errors || [{ msg: 'Update failed' }];
        errors.forEach(err => toast.error(err.msg));
    }
}

export const deleteUser = (id, navigate) => async (dispatch) => {
    try {

        await axios.delete(`${apiUrl}/auth/DeleteUser/${id}`)
        dispatch(logout())
        navigate('/Register')
    } catch (error) {
        dispatch(
            {
                type: FAIL,
                payload: error.response.data.errors
            }
        )
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/auth/getAllUsers`)

        dispatch(
            {
                type: GETALLUSERS,
                payload: res.data.allUsers
            }
        )


    } catch (error) {
        dispatch(
            {
                type: FAIL,
                payload: error.response.data.errors
            }
        )
    }
}


export const adminDeleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete(`${apiUrl}/auth/DeleteUser/${id}`)
        dispatch(getAllUsers())
    } catch (error) {
        dispatch(
            {
                type: FAIL,
                payload: error.response.data.errors
            }
        )
    }
}
