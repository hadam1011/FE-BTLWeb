import { Button, Input, Popconfirm, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ContentPages = ({ setBook, setDisabled }) => {
    const [listBook, setListBook] = useState([]);
    const [listSearch, setListSearch] = useState([]);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const isLogin = JSON.parse(localStorage.getItem("user")) !== null;

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/books');
        let data = await response.json();
        setListBook(data);
        setListSearch(listBook);
    }

    useEffect(() => {
        callApi();
    }, [])

    const handleAddBook = () => {
        setDisabled(true);
        setBook({});
        navigate('/admin/book');
    }

    const handleDelete = (record) => {
        var options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const fetchDelete = async () => {
            const response = await fetch(`http://localhost:8080/book/${record.bookcode}`, options);
            await callApi();
            api["success"]({
                message: "Thành công",
                description: "Xóa sách thành công",
            });
        }
        fetchDelete();
    }

    const handleView = (record) => {
        setBook(record);
        setDisabled(false);
        navigate('/admin/book');
    }

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();

        if (keyword.length === 0) callApi();
        console.log(keyword);

        const newList = listSearch.filter((book) => {
            return book.title.toLowerCase().includes(keyword)
                || book.author.toLowerCase().includes(keyword);
        })
        setListBook(newList);
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author"
        }, 
        {
            title: "Category",
            dataIndex: "category",
            key: "category"
        }, 
        {
            title: "Establish",
            dataIndex: "establish",
            key: "establish"
        }, 
        {
            title: "Total pages",
            dataIndex: "totalpage",
            key: "totalpage"
        }, 
        {
            title: "Sold",
            dataIndex: "sold",
            key: "sold"
        }, 
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    isLogin &&
                    <Space size={"small"}>
                            <Button type="primary" onClick={() => handleView(record)}>View</Button>
                            <Popconfirm
                                title="Xóa quyển sách này?"
                                onConfirm={() => handleDelete(record)}
                            >
                                <Button danger type="primary">Delete</Button>
                            </Popconfirm>
                    </Space>
                );
            }
        }
    ]
    
    return (
        <>
            {contextHolder}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '1em 0'
            }}>
                <Popconfirm
                    title="Bạn muốn thêm mới sách"
                    onConfirm={handleAddBook}
                >
                    <Button
                        type="primary"
                        disabled={!isLogin}
                    >
                        Add Book
                    </Button>
                </Popconfirm>
                <Input.Search 
                    style={{ width: '20%' }}
                    onChange={handleSearch}
                />  
            </div>
            <Table
                rowKey={(record) => record.bookcode}
                columns={columns}
                dataSource={listBook}
                bordered
                pagination={{
                    hideOnSinglePage: true
                }}
            />
        </>
    )
}

export default ContentPages;