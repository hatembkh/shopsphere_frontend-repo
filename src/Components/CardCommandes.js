import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { updateCommandes } from '../Redux/Actions/commandesActions';
import './CardCommandes.css';
import { format, parseISO } from 'date-fns'; // Added parseISO

const CardCommandes = ({ el }) => {
    const dispatch = useDispatch();

    const handleAccept = () => {
        const upStatus = 'Accepted';
        dispatch(updateCommandes(el._id, {
            qte: el.qte,
            status: upStatus,
            product: el.product._id,
            initQte: el.product.stockQty
        }));
    };

    const handleReject = () => {
        const upStatus = 'Rejected';
        dispatch(updateCommandes(el._id, { status: upStatus }));
    };

    // Safe date formatting function
    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'N/A';
            // Handle both ISO strings and Date objects
            const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
            return format(date, 'MMM dd, yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    return (
        <tr>
            <td data-label="Order ID">{el._id.slice(-8)}</td>
            <td data-label="Date">{formatDate(el?.orderDate)}</td>
            <td data-label="Customer">{el?.owner?.email}</td>
            <td data-label="Product">{el?.product?.name}</td>
            <td data-label="Qty">{el.qte}</td>
            <td data-label="Total">${el.totalPrice?.toFixed(2)}</td>
            <td data-label="Status" className={el.status}>{el.status}</td>
            <td data-label="Actions">
                {el.status === "Pending" && (
                    <div className="action-buttons">
                        <Button
                            className="action-btn accept-btn"
                            onClick={handleAccept}
                        >
                            Accept
                        </Button>
                        <Button
                            className="action-btn reject-btn"
                            onClick={handleReject}
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default CardCommandes;