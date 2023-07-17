import { Button, Space, Table, Modal, notification, Breadcrumb, Input, Skeleton } from "antd";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, ShoppingCartOutlined, HomeOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import * as cartService from '../services/cartServices';
import * as orderService from '../services/orderService';
import { AppContext } from "../context/appContext";

const Cart = () => {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [api, apiContextHolder] = notification.useNotification();
    const user = JSON.parse(localStorage.getItem('user'));
    const { fetchBook } = useContext(AppContext);

    const callApi = async () => {
        const data = await cartService.getUserCart(user.id);
        setBookList(data);
        setLoading(false);
    }
    
    useEffect(() => {
        callApi();
    }, [])

    const handleDate = () => {
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var currentDate = now.getFullYear() + "-" + month + "-" + day;
        return currentDate;
    }

    const handleConfirmCancel = (id) => {
        modal.confirm({
            title: "Confirm",
            content: "Cancel this order?",
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                handleCancel(id)
            },
        });
    }

    const handleCancel = (id) => {
        const fetchDelete = async () => {
            await cartService.deleteOrder(id);
            await callApi();
            api["success"]({
                message: "Message",
                description: "Order canceled successfully",
            });
        }
        fetchDelete();
    }

    const handleUpdate = (data, num) => {
        const newData = {
            userid: data.userid,
            bookid: data.bookid,
            title: data.title,
            quantity: data.quantity + num,
            book_cartid: data.book_cartid,
            price: data.price,
            total: data.price * (data.quantity + num)
        }

        const fetchUpdate = async () => {
            await cartService.updateOrder(newData);
            await callApi();
        }
        fetchUpdate();
    }

    const handleConfirmBuy = (record) => {
        modal.confirm({
            title: "Confirm",
            content: "Add to cart?",
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                handleBuy(record);
            },
        });
    }

    const handleBuy = (record) => {
        const newOrder = {
            userid: record.userid,
            bookid: record.bookid,
            title: record.title,
            price: record.price,
            total: record.total,
            quantity: record.quantity,
            date: handleDate()
        }

        const createOrder = async () => {
            await orderService.createOrder(newOrder);
            await cartService.deleteOrder(record.book_cartid);
            await fetchBook();
            api["success"]({
                message: "Message",
                description: "Add to cart successfully",
            });
        }
        createOrder();
    }

    const handleView = (record) => {
        navigate(`/book-detail/${record.bookid}`);
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (_, record) => {
                return (
                    <>
                        {`${record.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                    </>
                )
            },
        }, 
        {
            title: "Quantity",
            dataIndex: "quantity",
            render: (_, record) => {
                return (
                    <>
                        <Button
                            disabled={record.quantity === 1}
                            onClick={() => handleUpdate(record, -1)}
                        >
                            <MinusOutlined />
                        </Button>
                        <Input
                            value={record.quantity}
                            style={{ maxWidth: '5.3rem', textAlign: 'center' }}
                            readOnly
                        />
                        <Button onClick={() => handleUpdate(record, 1)}>
                            <PlusOutlined />
                        </Button>
                    </>
                )
            },
        }, 
        {
            title: "Total",
            dataIndex: "total",
            render: (_, record) => {
                return (
                    <>
                        {`${record.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                    </>
                )
            },
        }, 
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <>
                        <Space
                            size="small"
                            style={{}}
                        >
                            <Button
                                type="primary"
                                style={{ backgroundColor: "green" }}
                                onClick={() => handleConfirmBuy(record)}
                            >
                                Mua hàng
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => handleConfirmCancel(record.book_cartid)}
                            >
                                Hủy đơn
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => handleView(record)}
                            >
                                Chi tiết
                            </Button>
                        </Space>
                    
                    </>
                );
            },
        }
    ]

    return (
        <>
            {contextHolder}
            {apiContextHolder}
            <Breadcrumb
                style={{marginBottom: '1em'}}
                items={[
                    {
                        title: (
                            <>
                                <HomeOutlined />
                                <span>Home</span>                      
                            </>
                        )
                    },
                    {
                        title: (
                            <>
                                <ShoppingCartOutlined />
                                <span>Cart</span>                          
                            </>
                        )
                    }
                ]}
            />
            <Skeleton
                loading={loading}
                active
            >
                <Table
                    rowKey={record => record.book_cartid}
                    columns={columns}
                    dataSource={bookList}
                    bordered
                    pagination={{
                        hideOnSinglePage: true,
                    }}
                    scroll={{x: '100vw'}}
                />
            </Skeleton>
        </>
    )
}

export default Cart;