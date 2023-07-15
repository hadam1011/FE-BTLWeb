import { useEffect, useState } from 'react';
import * as orderService from '../../services/orderService';
import HistoryItem from './historyItem';

const History = () => {
    const [listOrder, setListOrder] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const callApi = async () => {
            const data = await orderService.getAllOrder(user.id);
            setListOrder(data);
        }
        callApi();
    }, [])

    return (
        <>
            {listOrder.map((order) => {
                return (
                    <HistoryItem order={order} />
                )
            })}
        </>
    )
}

export default History;