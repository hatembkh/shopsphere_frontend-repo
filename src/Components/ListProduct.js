// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addProduct, getAllProducts } from '../Redux/Actions/productActions'
// import CardProduct from './CardProduct'
// import Button from 'react-bootstrap/Button';
// import { useState } from 'react';
// import AddModal from './AddModal';
// import { current } from '../Redux/Actions/authActions';
// import Alert from 'react-bootstrap/Alert';


// const ListProduct = () => {

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllProducts())
//     }, [])

//     const products = useSelector(state => state.ProductReducer.products)

//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleAddButton = () => setShow(true);

//     const handleAdd=(newProduct)=>{
//         dispatch(addProduct(newProduct))
//         handleClose()
//     }

//      const getUserId=()=>{
//             dispatch(current())
//         }

//         useEffect(()=>{
//             getUserId()
//         },[])
//         const userId= useSelector(state => state.AuthReducer.user._id)
//         console.log(userId)

//         const success = useSelector(state=> state.CommandesReducer.success)

//     return (
//         <div >
//             {success && <Alert variant="success">Order placed!</Alert>}
//             <h1>Product List </h1>

//             <Button variant="primary" onClick={handleAddButton}>
//                 +
//             </Button>
//             <div style={{display: 'flex' , flexWrap : 'wrap', justifyContent: 'space-around', marginTop: '20px', marginBottom : '20px'}}>
//             {
//                 products && products.map((el,i,t) => <CardProduct key={el._id} el={el} userId={userId} />)
//             }
//             </div>
//             <AddModal showAddModal={show} closeAddModal={handleClose} handleAdd={handleAdd} />
//         </div>
//     )
// }

// export default ListProduct

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getAllProducts } from '../Redux/Actions/productActions';
import CardProduct from './CardProduct';

import AddModal from './AddModal';
import Alert from 'react-bootstrap/Alert';
import Loader from './Loader';
import { current } from '../Redux/Actions/authActions';
import { clearAll } from '../Redux/Actions/ErrorActions';
import './ListProduct.css';
import CustomButton from './CustomButton';

const ListProduct = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);


  const products = useSelector(state => state.ProductReducer.products);
  const user = useSelector(state => state.AuthReducer.user);
  const userId = useSelector(state => state.AuthReducer.user._id);
  const success = useSelector(state => state.CommandesReducer.success);

  const handleClose = () => setShow(false);
  const handleAddButton = () => setShow(true);

  const handleAdd = (newProduct) => {
    dispatch(addProduct(newProduct));
    handleClose();
  };

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(clearAll());
        setIsLoading(true);
        await dispatch(getAllProducts());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <Loader message="Loading products..." />;

  return (
    <div className="product-list-container">
      {success && (
        <Alert variant="light" className="success-alert">
          Order placed successfully!
        </Alert>
      )}

      <div className="product-list-header">
        <h1>Our Products</h1>

        {user?.role === 'admin' && (
          // <Button className="add-product-btn" onClick={handleAddButton}>
          //    Add Product
          // </Button>
          <CustomButton onClick={handleAddButton}>
            <i className="fas fa-plus"></i> Add Product
          </CustomButton>
        )}
      </div>

      {/* Optional: Add filter/sort controls like END. clothing */}
      {/* <div className="product-list-controls">
        <div>{products.length} products</div>
        <div className="product-list-sort">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div> */}

      <div className="products-grid">
        {products?.map(el => (
          <CardProduct key={el._id} el={el} userId={userId} />
        ))}
      </div>

      <AddModal showAddModal={show} closeAddModal={handleClose} handleAdd={handleAdd} />


    </div>
  );
};

export default ListProduct;
