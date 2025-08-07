import { Modal, Button } from 'react-bootstrap';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, orderId }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="confirmation-modal-body">
        <h5>Confirm Deletion</h5>
        <p>Are you sure you want to delete order #{orderId.slice(-8)}?</p>
        <div className="confirmation-buttons">
          <Button 
            variant="outline-dark" 
            onClick={onHide}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm}
            className="confirm-delete-btn"
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationModal;