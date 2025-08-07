

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneProduct, deleteProduct, updateProduct } from "../Redux/Actions/productActions"
import { useParams, useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalEdit from './EditModal';
import { addCommande } from '../Redux/Actions/commandesActions';
import "./DescProduct.css"
import { FaShoppingCart, FaCalendarAlt, FaBoxOpen, FaTag } from 'react-icons/fa';
import { current } from "../Redux/Actions/authActions";

const DescProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [showModal, setShowModal] = useState(false)
    const [counter, setCounter] = useState(0)
    const todayISO = new Date().toISOString().split('T')[0];


    useEffect(()=>{
        dispatch(current())
    },[dispatch])
    const user = useSelector(state => state.AuthReducer.user)

    useEffect(() => {
        dispatch(getOneProduct(id))
    }, [id, dispatch])

    const product = useSelector(state => state.ProductReducer.product)

    const handleEdit = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleSave = (updatedProduct) => {
        dispatch(updateProduct(id, updatedProduct))
        handleClose()
    }

    const handleDelete = () => {
        dispatch(deleteProduct(id))
        navigate('/ListProduct')
    }

    const handleBuy = () => {
        if (counter > 0 && product.stockQty >= counter) {
            dispatch(addCommande({ 
                product: id, 
                owner: user._id, 
                orderDate:todayISO,
                qte: counter, 
                totalPrice: counter * product.price 
            }, navigate))
        } else {
            alert('Not enough Stock')
        }
    }

    const increment = () => setCounter(counter + 1)
    const decrement = () => counter > 0 && setCounter(counter - 1)

    return (
            <>
        { 
            product && 

            <div className="desc-product-container">
            <Card.Img
                variant="top"
                src={`/${product?.image?.filename}`}
                className="product-image"
            />
            
            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <div className="product-price">${product.price}</div>
                
                <p className="product-description">{product.description}</p>
                
                <div className="product-meta">
                    <span><FaCalendarAlt /> Release Date: {product.releaseDate}</span>
                    <span><FaBoxOpen /> In Stock: {product.stockQty}</span>
                    <span><FaTag /> Category: {product.category}</span>
                </div>
                
                <div className="quantity-controls">
                    <button className="quantity-btn" onClick={decrement}>-</button>
                    <span className="quantity-value">{counter}</span>
                    <button className="quantity-btn" onClick={increment}>+</button>
                </div>
                
                <div className="product-actions">
                    {
                        user.role === 'admin' && 
                        <>
                        <Button className="btn-primary" onClick={handleEdit}>Edit</Button>
                        <Button className="btn-danger" onClick={handleDelete}>Delete</Button>
                        </>
                    }
                   
                    <Button className="btn-success" onClick={handleBuy}>
                        <FaShoppingCart /> BUY NOW
                    </Button>
                </div>
            </div>

            <ModalEdit
                showModal={showModal}
                closeModal={handleClose}
                product={product}
                handleSave={handleSave}
            />
        </div>
        }
        </>
    )
}

export default DescProduct