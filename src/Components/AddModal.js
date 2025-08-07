

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addProduct } from '../Redux/Actions/productActions';
import './AddModal.css';
const AddModal = ({ showAddModal, closeAddModal, handleAdd }) => {

    const dispatch = useDispatch()
    const todayISO = new Date().toISOString().split('T')[0];
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null); // Changed to store file object
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState(todayISO);
    const [stockQty, setStockQty] = useState(0);
    const [category, setCategory] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Store the file object
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        setName('')
        setImageFile(null)
        setPrice(0)
        setDescription('')
        setStockQty(0)
        setCategory('')
        setImagePreview('')
    }
    const handleAddP = (e) => {
        if (!imageFile || !name || !price || !description || !releaseDate || !stockQty || !category) {
            alert('Form Required');

        } else {
            setIsLoading(true)
            dispatch(addProduct({ name, price, description, imageFile, stockQty, category, releaseDate }))
            closeAddModal()
            handleReset()
        }


    }

    return (
        <Modal show={showAddModal} onHide={closeAddModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter product name"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Product Image*</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price ($)*</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="Enter price"
                        min="1"
                        step="0.01"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="Enter product description"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        type="date"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                        value={stockQty}
                        onChange={(e) => setStockQty(e.target.value)}
                        type="number"
                        placeholder="Enter stock quantity"
                        min="1"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        type="text"
                        placeholder="Enter product category"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    className="btn-custom-primary" 
                    onClick={handleAddP}
                    disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Add Product'}
                </Button>

                <Button
                    variant="secondary"
                    className="btn-custom-secondary"
                    onClick={closeAddModal}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddModal;