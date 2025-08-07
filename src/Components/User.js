import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { adminDeleteUser } from '../Redux/Actions/authActions';
import './User.css';

const User = ({ el }) => {
    const dispatch = useDispatch();

    const handleAdminDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${el.name}?`)) {
            dispatch(adminDeleteUser(el._id));
        }
    };

    return (
        <Card className="user-card">
            <Card.Img
                variant="top"
                src={el.image.filename || '/default-avatar.jpg'}
                className="user-card-img"
                alt={el.name}
            />
            <Card.Body className="user-card-body">
                <Card.Title className="user-card-title">{el.name}</Card.Title>
                <Card.Text className="user-card-text">
                    <strong>E-mail:</strong> {el.email}
                </Card.Text>
                <Card.Text className="user-card-text">
                    <strong>Phone Number:</strong> <span className="user-id">{el.phoneNumber? '+':''}{el.phoneNumber}</span>
                </Card.Text>
                {/* <Button 
                    className="delete-user-btn"
                    onClick={handleAdminDelete}
                >
                    Delete User
                </Button> */}
                <Button
                    variant="outline-danger"
                    className="text-uppercase letter-spacing-1"
                    onClick={handleAdminDelete}
                >
                    Delete User
                </Button>
            </Card.Body>
        </Card>
    );
};

export default User;