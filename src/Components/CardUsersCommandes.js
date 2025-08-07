import { useDispatch } from 'react-redux';
import { deleteCommande } from '../Redux/Actions/commandesActions';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import Button from 'react-bootstrap/Button';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './CardUsersCommandes.css';

const CardUsersCommandes = ({ el }) => {
    const dispatch = useDispatch();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        dispatch(deleteCommande(el._id));
        setShowDeleteModal(false);
    };

    useEffect(() => {
        if (el.product == null) {
            dispatch(deleteCommande(el._id));
        }
    }, [el.product,el._id, dispatch]);

    // Safe date formatting function
    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'N/A';
            const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
            return format(date, 'MMM dd, yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };
    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

    return (
        <>
            <tr>
                <td data-label="Order ID">{el._id.slice(-8)}</td>
                <td data-label="Date">{formatDate(el?.orderDate)}</td>
                <td data-label="Product">{el?.product?.name || 'Product removed'}</td>
                <td data-label="Qty">{el.qte}</td>
                <td data-label="Total">${el.totalPrice?.toFixed(2)}</td>
                <td data-label="Status" className={el.status}>{el.status}</td>
                <td data-label="Actions">
                    {el.status === 'Pending' && (
                        <Button
                            className="delete-btn"
                            onClick={openDeleteModal}
                            variant="outline-danger"
                            size="sm"
                        >
                            Delete
                        </Button>
                    )}
                </td>
            </tr>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={closeDeleteModal}
                onConfirm={handleDelete}
                orderId={el._id}
            />
        </>
    );
};

export default CardUsersCommandes;