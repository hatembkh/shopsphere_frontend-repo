import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Redux/Actions/authActions';
import { clearAll } from '../Redux/Actions/ErrorActions';
import Loader from './Loader';
import User from './User';
import './Users.css';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.AuthReducer.users);
    const [isLoading, setIsLoading] = useState(true);

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(clearAll());
                setIsLoading(true);
                await dispatch(getAllUsers());
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
        const message = "Loading Users list...";
        return <Loader message={message} />;
    }

    return (
        <div className="users-list-container">
            <h1 className="users-list-title">Users Management</h1>
            <div className="users-grid">
                {users && users.map((el) => (
                    <User key={el._id} el={el} />
                ))}
            </div>
        </div>
    );
};

export default Users;