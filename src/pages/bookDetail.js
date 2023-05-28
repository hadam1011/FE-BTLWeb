import { Row, Col, Typography, Rate, Space, Button, Input, Divider, Popconfirm, notification, Breadcrumb } from "antd";
import { MinusOutlined, PlusOutlined, SendOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import Comment from "../Components/User/comment";

const BookDetail = () => {
    const book = JSON.parse(window.localStorage.getItem('book'));
    const user = JSON.parse(window.localStorage.getItem('user'));
    const render = JSON.parse(window.localStorage.getItem('render'));
    const [api, contextHolder] = notification.useNotification();
    const [count, setCount] = useState(1);
    const [rate, setRate] = useState(5);
    const [star, setStar] = useState(Math.floor(book.star / book.comment));
    const [commentList, setCommentList] = useState([]);

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/comments');
        let data = await response.json();
        setCommentList(data);
        window.localStorage.removeItem('render');
    }
    
    useEffect(() => {
        callApi();
    }, [])

    if (render !== null) {
        callApi();
    }

    const handleRate = (e) => {
        setRate(e);
    }

    const handleComment = (e) => {
        const data = {
            userid: user.id,
            username: user.username,
            bookid: book.bookcode,
            content: document.getElementById('comment').value,
            star: rate
        }

        const newBook = {
            title: book.title,
            author: book.author,
            category: book.category,
            establish: book.establish,
            sold: book.sold,
            avatar: book.avatar,
            description: book.description,
            totalpage: book.totalpage,
            comment: book.comment + 1,
            star: rate + book.star,
        }

        var options = {
            method: "POST" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        var optionUpdate = {
            method: "PUT" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        };

        const fetchCreate = async () => {
            const response = await fetch('http://localhost:8080/comment', options);
            const responseUpdate = await fetch(`http://localhost:8080/book/${book.bookcode}`, optionUpdate);
            await callApi();    
            setStar(Math.floor(newBook.star / newBook.comment));
            window.localStorage.setItem('re-render', JSON.stringify({check : true}));
        }
        fetchCreate();
    }

    const showNoti = () => {
        api["success"]({
            message: "Thành công",
            description: "Đặt hàng thành công",
          });
    }

    const handleClickBuy = () => {
        var now = new Date();
        var month = now.getMonth();
        var day = now.getDate();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var currentDate = now.getFullYear() + "-" + month + "-" + day;

        const data = {
            userid: user.id,
            title: book.title,
            bookid: book.bookcode,
            quantity: count,
            status: "Đang chờ",
            purchase: currentDate
        }

        var options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const fetchCreate = async () => {
            const response = await fetch(`http://localhost:8080/book-cart`, options);
            showNoti();
        }
        fetchCreate();
    }

    const suffix = (
        <SendOutlined onClick={handleComment}/>
    );

    return (
        <>
            {contextHolder}
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
                                <BookOutlined />
                                <span>{book.title}</span>                           
                            </>
                        )
                    }
                ]}
            />
            <Row style={{background: '#fff'}}>
                <Col span={10}>
                    <img src={book.avatar} height='500rem' alt=""/>
                </Col>
                {/* <span
                    style={{
                        height: '600px',
                        width: '2px',
                        border: '1px solid black',
                    }} /> */}
                <Col span={13} style={{margin: '1em 0 0 1em'}}>
                    <Typography.Text>
                        {`Tác giả: ${book.author}`}
                    </Typography.Text><br />
                    <Typography.Text>
                        {`Thể loại: ${book.category}`}
                    </Typography.Text>
                    <Typography.Title style={{margin: '0'}}>
                        {book.title}
                    </Typography.Title>
                    <div style={{marginBottom: '2em'}}>
                        <Space size="small">
                            <Rate disabled value={star} />
                            <span style={{border: '1px solid gray'}}/>
                            <Typography.Text>
                                {`Số lượng đã bán: ${book.sold}`}
                            </Typography.Text>
                        </Space>
                    </div>
                    <div style={{marginBottom: '1em'}}> 
                        <Typography.Text>Số lượng </Typography.Text>    
                    </div>
                    <div>
                        <Button
                            disabled={count === 1}
                            onClick={() => setCount(count - 1)}
                        >
                            <MinusOutlined />
                        </Button>
                        <Input
                            defaultValue="1"
                            style={{ maxWidth: '6em', textAlign: 'center' }}
                            value={`${count}`}
                            readOnly
                        />
                        <Button onClick={() => setCount(count + 1)}>
                            <PlusOutlined />
                        </Button>
                    </div>
                    <Popconfirm
                        title="Đặt mua quyển sách này?"
                        onConfirm={handleClickBuy}
                    >
                        <Button
                            type="primary"
                            style={{ margin: '1em 0', minWidth: '11rem' }}
                        >
                            Chọn Mua
                        </Button>
                    </Popconfirm>
                    <div>
                        <Divider style={{ marginBottom: '1em'}}/>
                        <Typography.Text strong style={{ fontSize: '16px'}}>Mô tả sách: </Typography.Text>
                        <Typography.Text>{book.description}</Typography.Text>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: '1em', background: '#fff' }}>
                <Col style={{ margin: '0 0 1em 1em'}} span={23}>
                    <div>
                        <Typography.Text
                            strong
                            style={{ fontSize: '1.5em' }}
                        >
                            Đánh giá - Nhận xét
                        </Typography.Text>
                    </div>
                    <Typography.Text>Bình luận</Typography.Text>
                    <div>
                        <Rate defaultValue={5} onChange={handleRate}/><br/>
                        <Input
                            id="comment"
                            suffix={suffix}
                            required
                            style={{ maxWidth: '20rem' }}
                            onPressEnter={handleComment}
                            allowClear
                        />
                    </div>
                    <Divider />
                    {commentList.map((comment, index) => {
                        if (comment.bookid === book.bookcode) {
                            return (
                                <Comment comment={comment} setStar={setStar} key={index} />
                            )
                        }
                    })}
                </Col>
            </Row>
        </>
    )
}

export default BookDetail;