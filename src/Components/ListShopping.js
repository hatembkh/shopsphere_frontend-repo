import { useEffect, useState } from "react";
import { getUsersCommand } from "../Redux/Actions/commandesActions";
import { useDispatch, useSelector } from "react-redux";
import CardUsersCommandes from "./CardUsersCommandes";
import { clearAll } from "../Redux/Actions/ErrorActions";

import Loader from "./Loader";
import Table from "react-bootstrap/Table";
import "./ListShopping.css";

const ListShopping = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const usersCommand = useSelector(state => state.CommandesReducer.usercommandes);

    // const clearErrors = () => {
    //     dispatch(clearAll());
    // };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(clearAll());
                setIsLoading(true);
                await dispatch(getUsersCommand());
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
        const message = "Loading your shopping items...";
        return <Loader message={message}/>;
    }

    return (
        <div className="shopping-list-container">
            <h1 className="shopping-list-title">Your Orders</h1>
            
            <div className="table-responsive">
                <Table className="shopping-list-table" hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersCommand.length > 0 ? (
                            usersCommand.map(el => (
                                <CardUsersCommandes key={el._id} el={el} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="empty-cart-message">
                                    Your shopping cart is empty
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ListShopping;