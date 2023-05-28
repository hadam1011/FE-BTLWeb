import { Col, Row, Typography, Form, Input, Button, InputNumber, Space, Select, notification, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Book = ({ book, disabled }) => {
    const [bookList, setBookList] = useState([]);
    const [selectValue, setSelectValue] = useState(book.category);
    const [avatar, setImgUrl] = useState(book.avatar);
    const [isEdit, setIsEdit] = useState(false);
    const [date, setDate] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const dateFormat = 'YYYY/MM/DD';

    const selectOptions = [
        {
            value: 'Truyện',
            lable: 'Truyện'
        },
        {
            value: 'Truyện tranh',
            lable: 'Truyện tranh'
        },
        {
            value: 'Tiểu thuyết',
            lable: 'Tiểu thuyết'
        },
        {
            value: 'Kỹ năng',
            lable: 'Kỹ năng'
        },
        {
            value: 'Trinh Thám',
            lable: 'Trinh Thám'
        },
        {
            value: 'Khoa Học',
            lable: 'Khoa Học'
        },
        {
            value: 'Viễn Tưởng',
            lable: 'Viễn Tưởng'
        },
        {
            value: 'Sách giáo khoa',
            lable: 'Sách giáo khoa'
        },
        {
            value: 'Sách tham khảo',
            lable: 'Sách tham khảo'
        },
        {
            value: 'Sách Self-help',
            lable: 'Sách Self-help'
        },
    ]

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/books');
        let data = await response.json();
        setBookList(data);
    }

    useEffect(() => {
        callApi();
    }, [])

    const handleClickUpload = () => {
        document.getElementById('getFile').click();
    }

    const handleFile = (e) => {
        var preview = document.querySelector('img');
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
            setImgUrl(preview.src);
        }
        reader.readAsDataURL(file);
    }

    const handleAddBook = (data) => {
        const bookData = {
            title: data.title,
            author: data.author,
            description: data.description,
            establish: date,
            totalpage: data.totalpage,
            category: data.category,
            sold: data.sold,
            avatar: avatar
        }

        var options = {
            method: "POST" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        };

        let checkExist = false;
        bookList.forEach((book) => {
            if (book.title.toLowerCase() === data.title.toLowerCase() &&
                book.author.toLowerCase() === data.author.toLowerCase()) {
                checkExist = true;
            }    
        })

        if (!checkExist) {
            const fetchCreate = async () => {
                const response = await fetch('http://localhost:8080/book', options);
                api["success"]({
                    message: "Thành công",
                    description: "Thêm sách thành công",
                });
                setTimeout(() => {
                    navigate('/admin');
                }, 2000);
            }
            fetchCreate();
        } else {
            api["error"]({
                message: "Lỗi",
                description: "Sách đã tồn tại",
            });
        }
    }

    const handleClickEdit = () => {
        setIsEdit(true);
    }

    const handleClickSave = () => {
        const data = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            description: document.getElementById('description').value,
            establish: date,
            totalpage: document.getElementById('totalpage').value,
            category: selectValue,
            sold: document.getElementById('sold').value,
            avatar: avatar
        }

        var options = {
            method: "PUT" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const fetchUpdate = async () => {
            const response = await fetch(`http://localhost:8080/book/${book.bookcode}`, options);
            api["success"]({
                message: "Thành công",
                description: "Sửa thông tin thành công",
            });
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
        }
        fetchUpdate();
    }

    const handleDate = (date, dateString) => {
        setDate(dateString.replace(/\//g, "-"));          
    }

    return (
        <>
            {contextHolder}
            <Typography.Title style={{ textAlign: 'center' }}>Sách</Typography.Title>
            <Form layout='vertical' onFinish={(data) => handleAddBook(data)}>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            label="Tiêu đề:"
                            name="title"
                            initialValue={book.title}
                            rules={[
                                {
                                  required: true,
                                  message: "Không được để trống",
                                }
                              ]}
                        >
                            <Input style={{ maxWidth: '15rem' }} disabled={!isEdit && !disabled} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Tác giả:"
                            name="author"
                            initialValue={book.author}
                            rules={[
                                {
                                  required: true,
                                  message: "Không được để trống",
                                }
                              ]}
                        >
                            <Input style={{maxWidth: '15rem'}} disabled={!isEdit && !disabled}/>
                        </Form.Item>
                    </Col> 
                    <Col span={12}>
                        <label>Ảnh bìa:</label><br/>
                        <Button onClick={handleClickUpload} disabled={!isEdit && !disabled}>Upload</Button>
                        <input type='file' id="getFile" style={{ display: 'none' }} onChange={handleFile} /><br/>
                        <img
                            src={book.avatar}
                            height="200"
                            style={{
                                position: 'absolute',
                                marginTop: '2rem',
                                height: '26rem',
                                width: '23rem'
                            }}
                            alt=""
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Mô tả về sách"
                            name="description"
                            initialValue={book.description}
                        >
                            <Input.TextArea style={{maxWidth: '37rem', minHeight: '10rem'}} disabled={!isEdit && !disabled}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            label="Ngày phát hành:"
                            name="establish"
                            initialValue={book.establish === undefined ? null : dayjs(book.establish)}
                            rules={[
                                {
                                  required: true,
                                  message: "Không được để trống",
                                }
                              ]}
                        >
                            <DatePicker
                                format={dateFormat}
                                style={{ minWidth: '15rem' }}
                                disabled={!isEdit && !disabled}
                                onChange={handleDate}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Số trang:"
                            name="totalpage"
                            initialValue={book.totalpage}
                        >
                            <InputNumber style={{minWidth: '15rem'}} disabled={!isEdit && !disabled}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            label="Thể loại:"
                            name="category"
                            initialValue={book.category}
                            rules={[
                                {
                                  required: true,
                                  message: "Không được để trống",
                                }
                              ]}
                        >
                            <Select onChange={(value) => setSelectValue(value)} options={selectOptions} style={{maxWidth: '15rem'}} disabled={!isEdit && !disabled}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Số lượng đã bán:"
                            name="sold" initialValue={book.sold}
                            rules={[
                                {
                                  required: true,
                                  message: "Không được để trống",
                                }
                              ]}
                        >
                            <InputNumber style={{minWidth: '15rem'}} disabled={!isEdit && !disabled}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Space size="small">
                        <Button htmlType="submit" type="primary" hidden={!disabled}>
                            Add
                        </Button>
                        {isEdit ? 
                            <Button type="primary" onClick={handleClickSave}>
                                Save
                            </Button>
                        :
                            <Button type="primary" hidden={disabled} onClick={handleClickEdit}>
                                Edit
                            </Button>
                        }
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

export default Book;