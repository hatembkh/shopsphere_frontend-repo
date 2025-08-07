import axios from "axios"
import { HANDLEERROR } from "../ActionTypes/errorActionTypes"
import { GETALLPRODUCTS, GETONEPRODUCT } from "../ActionTypes/productActionTypes"

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"


export const getAllProducts = () => async (dispatch) => {
    try {
        const res = await axios.get(`${apiUrl}/Product/getAllProducts`)

        dispatch(
            {
                type: GETALLPRODUCTS,
                payload: res.data.getAllProducts
            }
        )
    } catch (error) {
        dispatch(
            {
                type: HANDLEERROR,
                payload: error.response.data.errors
            }
        )
    }
}


export const updateProduct = (id, upProduct, oldImage) => async (dispatch) => {
    try {
        const formData = new FormData();
            formData.append('name', upProduct.name);
            formData.append('price', upProduct.price);
            formData.append('description', upProduct.description);
            formData.append('stockQty', upProduct.stockQty);
            formData.append('category', upProduct.category);
            if (upProduct?.image) {
                formData.append('image', upProduct?.image);
            }
            

        await axios.put(`${apiUrl}/Product/UpdateProduct/${id}`, formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }) 

        await dispatch(getOneProduct(id))
    } catch (error) {
        dispatch(
            {
                type: HANDLEERROR,
                payload: error.response.data.errors
            }
        )
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`${apiUrl}/Product/DeleteProduct/${id}`)

        dispatch(getAllProducts())
        
    } catch (error) {
        dispatch(
            {
                type: HANDLEERROR,
                payload: error.response.data.errors
            }
        )
    }
}

export const addProduct = (newProduct) => async (dispatch) => {
    try {

            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('description', newProduct.description);
            formData.append('releaseDate', newProduct.releaseDate);
            formData.append('stockQty', newProduct.stockQty);
            formData.append('category', newProduct.category);
            formData.append('image', newProduct.imageFile);

            await axios.post(`${apiUrl}/Product/addProduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        dispatch( getAllProducts())
    } catch (error) {
        dispatch(
            {
                type: HANDLEERROR,
                payload: error.response.data.errors
            }
        )
    }
}


export const getOneProduct = (id) => async (dispatch) => {
    try {
        
        const res = await axios.get(`${apiUrl}/Product/getOneProduct/${id}`)

        dispatch(
            {
                type: GETONEPRODUCT,
                payload: res.data.getOneProduct
            }
        )
    } catch (error) {
        dispatch(
            {
                type: HANDLEERROR,
                payload: error.response.data.errors
            }
        )
    }
}
