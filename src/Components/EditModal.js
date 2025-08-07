import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import './ModalStyles.css'; // Import the CSS file

const ModalEdit = ({ showModal, closeModal, handleSave, product }) => {
    const [name, setName] = useState(product.name);
    const [image, setImage] = useState(product.image);
    const [price, setPrice] = useState(product?.price);
    const [description, setDescription] = useState(product.description);
    const [stockQty, setStockQty] = useState(product.stockQty);
    const [category, setCategory] = useState(product.category);
    const [imagePreview, setImagePreview] = useState(product.image?.path);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        handleSave({
            name,
            image,
            price,
            description,
            stockQty,
            category
        });
    };

    useEffect(()=>{
        setName(product.name)
        setImage(product.image)
        setPrice(product.price)
        setDescription(product.description)
        setStockQty(product.stockQty)
        setCategory(product.category)
        setImagePreview(product.image?.path)
    },[product])
    return (
        <Modal 
            show={showModal} 
            onHide={closeModal}
            centered
            className="modal-overlay"
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title className="modal-title">Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form.Group className="form-group-custom">
                    <Form.Label className="form-label-custom">Name</Form.Label>
                    <Form.Control 
                        className="form-control-custom"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        type="text" 
                        placeholder="Enter product name" 
                    />
                </Form.Group>

                <Form.Group className="form-group-custom">
                    <Form.Label className="form-label-custom">Product Image</Form.Label>
                    <div className="file-input-wrapper">
                        <label className="file-input-button">
                            <div className="file-input-label">
                                <span className="file-input-icon">📷</span>
                                <span>{imagePreview ? 'Change Image' : 'Upload Image'}</span>
                            </div>
                            <input 
                                
                                className="file-input"
                                type="file" 
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                    {imagePreview && (
                        <img 
                            value ={image.path}
                            src= {imagePreview}
                            alt="Preview" 
                            className="image-preview"
                        />
                    )}
                </Form.Group>

                <Form.Group className="form-group-custom">
                    <Form.Label className="form-label-custom">Price ($)</Form.Label>
                    <Form.Control 
                        className="form-control-custom"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        type="number" 
                        placeholder="Enter price" 
                        min="0"
                        step="0.01"
                    />
                </Form.Group>

                <Form.Group className="form-group-custom">
                    <Form.Label className="form-label-custom">Description</Form.Label>
                    <Form.Control 
                        className="form-control-custom"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        as="textarea" 
                        rows={3}
                        placeholder="Enter product description" 
                    />
                </Form.Group>

                <Form.Group className="form-group-custom">
                    <Form.Label className="form-label-custom">Stock Quantity</Form.Label>
                    <Form.Control 
                        className="form-control-custom"
                        value={stockQty} 
                        onChange={(e) => setStockQty(e.target.value)} 
                        type="number" 
                        placeholder="Enter stock quantity" 
                        min="0"
                    />
                </Form.Group>

                <Form.Group className="form-group-custom">
                    <Form.Label className="form-label-custom">Category</Form.Label>
                    <Form.Control 
                        className="form-control-custom"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        type="text" 
                        placeholder="Enter product category" 
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button 
                    variant="secondary" 
                    onClick={closeModal}
                    className="modal-btn modal-btn-secondary"
                >
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    className="modal-btn modal-btn-primary"
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdit;

