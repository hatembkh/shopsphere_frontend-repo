import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { getAllCommandes } from '../Redux/Actions/commandesActions';
import CardCommandes from './CardCommandes';
import { useEffect, useState } from 'react';
import { clearAll } from '../Redux/Actions/ErrorActions';
import Loader from './Loader';
import './ListCommandes.css';

const ListCommandes = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

  

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(clearAll())
                setIsLoading(true)
                await dispatch(getAllCommandes())
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(clearAll())
            setIsLoading(false)
        }
    }, [dispatch])

    const commandes = useSelector(state => state.CommandesReducer.commandes)

    if (isLoading) {
        const message = "Loading all commands list..." 
        return <Loader message={message}/>
    }

    return (
        <div className="commands-list-container">
            <h2 className="commands-title">ORDERS MANAGEMENT</h2>
            <div className="table-responsive">
                <Table hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.length > 0 ? (
                            commandes.map((el, i) => <CardCommandes key={el._id} el={el} />)
                        ) : (
                            <tr>
                                <td colSpan="8" className="empty-state">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListCommandes