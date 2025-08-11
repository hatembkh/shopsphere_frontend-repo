import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { current, deleteUser } from '../Redux/Actions/authActions';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { clearAll } from '../Redux/Actions/ErrorActions';
import Loader from './Loader';
import ListShopping from './ListShopping';
import './Profile.css'; // We'll create this CSS file

const Profil = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.AuthReducer.user);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        dispatch(deleteUser(user._id, navigate));
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(clearAll());
                setIsLoading(true);
                await dispatch(current());
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearAll());
            setIsLoading(false);
        };
    }, [dispatch]);

    if (isLoading) {
        const message = "Loading your Profile...";
        return <Loader message={message} />;
    }

    return (
        <div className="profile-container">
            {user && (
                <>
                    <div className="profile-header">
                        <h1 className="profile-title">Your Profile</h1>
                    </div>

                    <div className="profile-card">
                        <div className="profile-avatar-container">
                            {user.image && ( 
                                <img
                                src={user.image.url || '/userDefaultImage.png'}
                                alt="profile"
                                className="profile-avatar"
                                onError={(e) => {
                                    e.target.src = '/userDefaultImage.png';
                                }}
                            />)}
                          
                        </div>

                        <div className="profile-details">
                            <div className="profile-detail-group">
                                <span className="profile-detail-label">Full Name</span>
                                <p className="profile-detail-value">{user.name}</p>
                            </div>

                            <div className="profile-detail-group">
                                <span className="profile-detail-label">Email Address</span>
                                <p className="profile-detail-value">{user.email}</p>
                            </div>

                            <div className="profile-detail-group">
                                <span className="profile-detail-label">Address</span>
                                <p className="profile-detail-value">{user.adress}</p>
                            </div>

                            <div className="profile-detail-group">
                                <span className="profile-detail-label">Phone Number</span>
                                <p className="profile-detail-value">+{user.phoneNumber}</p>
                            </div>

                            <div className="profile-actions">
                                <Link to="/EditUser" className="edit-profile-link">
                                    <Button variant="outline-dark" className="edit-profile-btn">
                                        Edit Profile
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    className="delete-account-btn"
                                    onClick={handleShow}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        backdrop="static"
                        className="delete-account-modal"
                    >
                        <Modal.Header closeButton className="delete-modal-header">
                            <Modal.Title as="h5" className="delete-modal-title">
                                DELETE ACCOUNT
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="delete-modal-body">
                            <p className="delete-warning-text">
                                Please think twice before you delete your account!<br />
                                This action cannot be undone.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="delete-modal-footer">
                            <Button
                                variant="outline-dark"
                                onClick={handleClose}
                                className="delete-modal-cancel-btn"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                                className="delete-modal-confirm-btn"
                            >
                                Confirm Deletion
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}

            <ListShopping />
        </div>
    );
};

export default Profil;