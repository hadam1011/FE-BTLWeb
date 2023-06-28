import { Button, Space, Table, Tag, Modal, notification, Breadcrumb } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons"

const Cart = () => {
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [api, apiContextHolder] = notification.useNotification();
    const user = JSON.parse(localStorage.getItem('user'));

    const callApi = async () => {
        const response = await fetch(`http://localhost:8080/book-cart/${user.id}`);
        let data = await response.json();
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
        var options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        };
    
        const fetchDelete = async () => {
            const response = await fetch(`http://localhost:8080/book-cart/${id}`, options);
            await callApi();
            api["success"]({
                message: "Thành công",
                description: "Hủy đặt hàng thành công",
            });
        }
        fetchDelete();
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
        const data = {  
            userid: record.userid,
            bookid: record.bookid,
            title: record.title,
            purchase: record.purchase,
            quantity: record.quantity,
            status: "Đã mua"
        }

        var options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const fetchUpdate = async () => {
            const response = await fetch(`http://localhost:8080/book-cart/${record.book_cartid}`, options);
            await callApi();
            window.localStorage.setItem('re-render', JSON.stringify({check : true}));
            api["success"]({
                message: "Thành công",
                description: "Mua hàng thành công",
            });
        }
        fetchUpdate();
    }

    const handleView = (record) => {
        const callApi = async () => {
            const response = await fetch(`http://localhost:8080/books/${record.bookid}`);
            const data = await response.json();
            navigate('/book-detail');
        }
        callApi();
    }

    const columns = [
        {
            title: "Mã sách",
            dataIndex: "book_cartid",
            key: "book_cartid"
        },
        {
            title: "Tên sách",
            dataIndex: "title",
            key: "title"
        }, 
        {
            title: "Ngày đặt mua",
            dataIndex: "purchase",
            key: "purchase"
        }, 
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity"
        }, 
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                let color = record.status === "Đã mua" ? "green" : "gray";
                return (
                    <Tag color={color} style={{fontSize: '14px'}}>{record.status}</Tag>
                )
            },
        }, 
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <>
                        <Space size="small">
                            {record.status === 'Đang chờ' &&
                            <Space size="small">
                                <Button
                                    danger
                                    type="primary"
                                    onClick={() => handleConfirmCancel(record.book_cartid)}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => handleConfirmBuy(record)}
                                >
                                    Xác nhận
                                </Button>
                            </Space>}
                            <Button
                                type="primary"
                                onClick={() => handleView(record)}
                            >
                                Chi tiết
                            </Button>
                        </Space>
                    
                    </>
                );
            }
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
            />
        </>
    )
}

export default Cart;