import { Button, Space, Table, Modal, notification, Breadcrumb, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, ShoppingCartOutlined, HomeOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import * as cartService from '../services/cartServices'

const Cart = () => {
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [api, apiContextHolder] = notification.useNotification();
    const user = JSON.parse(localStorage.getItem('user'));

    const callApi = async () => {
        const data = await cartService.getUserCart(user.id);
        setBookList(data);
    }
    
    useEffect(() => {
        callApi();
    }, [])

    const handleConfirmCancel = (id) => {
        modal.confirm({
            title: "Hủy đặt hàng",
            content: "Bạn muốn hủy đơn hàng này?",
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
                message: "Thành công",
                description: "Hủy đặt hàng thành công",
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
            title: "Xác nhận mua",
            content: "Bạn muốn mua mặt hàng này?",
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                handleBuy(record);
            },
        });
    }

    const handleBuy = (record) => {
    }

    const handleView = (record) => {
        navigate(`/book-detail/${record.bookid}`);
    }

    const columns = [
        {
            title: "Tên sách",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Đơn giá",
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
            title: "Số lượng",
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
            title: "Thành tiền",
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
        </>
    )
}

export default Cart;