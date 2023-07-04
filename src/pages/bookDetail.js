import { Row, Col, Typography, Rate, Space, Button, Input, Divider, Popconfirm, notification, Breadcrumb } from "antd";
import { MinusOutlined, PlusOutlined, SendOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Comment from "../Components/User/comment";
import * as bookService from "../services/bookServices"
import * as commentService from "../services/commentServices"
import * as starService from "../services/starServices"

const BookDetail = () => {
    const [api, contextHolder] = notification.useNotification();
    const [count, setCount] = useState(1);
    const [book, setBook] = useState({});
    const [vote, setVote] = useState(0);
    const [rate, setRate] = useState(0);
    const [userVote, setUserVote] = useState(undefined);
    const [commentList, setCommentList] = useState([]);
    const { bookcode } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const showNoti = (message) => {
        api["success"]({
            message: "Thành công",
            description: `${message}`,
          });
    }

    const handleStarDisplay = async (bookid) => {
        const votes = await starService.getStarsByBookId(bookid);
        setUserVote(votes.find(vote => {
            return vote.userid === user.id;
        }))
        setVote(votes.length);
    
        const sumStar = votes.reduce((store, vote) => {
            return store + vote.star;
        }, 0);
        setRate(Math.floor(sumStar / votes.length));
    }

    useEffect(() => {
        const callApi = async () => {
            const bookData = await bookService.getBookById(bookcode);
            setBook(bookData);

            const comments = await commentService.getAllComment();
            setCommentList(comments);

            handleStarDisplay(bookData.bookcode);
        }
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

    const handleComment = (e) => {
        const data = {
            userid: user.id,
            username: user.username,
            bookid: book.bookcode,
            content: document.getElementById('comment').value,
            date: handleDate()
        }

        const fetchCreate = async () => {
            await commentService.createComment(data);
            setCommentList([...commentList, data]); 
            window.localStorage.setItem('re-render', JSON.stringify({ check: true }));
        }
        fetchCreate();
    }


    const handleClickBuy = () => {
        const data = {
            userid: user.id,
            title: book.title,
            bookid: book.bookcode,
            quantity: count,
            status: "Đang chờ",
            purchase: handleDate()
        }

        var options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const fetchCreate = async () => {
            await fetch(`http://localhost:8080/book-cart`, options);
            showNoti("Đặt hàng thành công");
        }
        fetchCreate();
    }
    
    const handleClickRate = (e) => {
        const data = {
            userid: user.id,
            bookid: book.bookcode,
            star: e
        }

        const fetchUpdate = async () => {
            await starService.updateStar(userVote.starid, data);
            handleStarDisplay(book.bookcode);
            showNoti("Cập nhật đánh giá thành công");
        }

        const fetchCreate = async () => {
            await starService.createStar(data);
            handleStarDisplay(book.bookcode);
            setVote(vote + 1);
            showNoti("Đánh giá thành công");
        }
   
        const fetchDelete = async () => {
            await starService.deleteStar(userVote.starid);
            handleStarDisplay(book.bookcode);
            setVote(vote - 1);
            showNoti("Hủy đánh giá thành công");
        }

        if (e !== 0 && userVote !== undefined) fetchUpdate();
        else if (e !== 0) fetchCreate();
        else fetchDelete();
    }
    
    const suffix = (
        <SendOutlined onClick={handleComment}/>
    );

    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{marginBottom: '1rem'}}
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
                <Col xl={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={book.avatar} height='350rem' alt=""/>
                </Col>
                <Col xl={15} style={{margin: '1rem 0 0 1rem'}}>
                    <Typography.Text>
                        {`Tác giả: ${book.author}`}
                    </Typography.Text><br />
                    <Typography.Text>
                        {`Thể loại: ${book.category}`}
                    </Typography.Text>
                    <Typography.Title style={{margin: '0'}}>
                        {book.title}
                    </Typography.Title>
                    <div style={{margin: '0.8rem 0px'}}>
                        <Space size="small">    
                            <Rate disabled value={rate} style={{fontSize: '1.5rem'}}/>
                            <Typography.Text
                                style={{
                                    fontSize: '0.8rem',
                                    fontStyle: 'italic',
                                    opacity: '0.8'
                                }}
                            >
                                {`(${vote} Đánh giá)`}
                            </Typography.Text>
                            <span style={{border: '1px solid gray', height: '1.5rem', display: 'block'}}/>
                            <Typography.Text>
                                {`Số lượng đã bán: ${book.sold}`}
                            </Typography.Text>
                        </Space>
                    </div>
                    <div>
                        <Typography.Text
                            style={{
                                fontSize: '3rem'
                            }}
                        >
                            {`${book.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                        </Typography.Text>
                    </div>
                    <div style={{marginBottom: '1rem'}}> 
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
                            style={{ maxWidth: '5.3rem', textAlign: 'center' }}
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
                            style={{ margin: '0.9rem 0', minWidth: '11rem' }}
                        >
                            Chọn Mua
                        </Button>
                    </Popconfirm>
                    <div style={{ marginBottom: '1rem', marginRight: '1rem' }}>
                        <Divider />
                        <Typography.Text strong style={{ fontSize: '1rem'}}>Mô tả sách: </Typography.Text>
                        <Typography.Text>{book.description}</Typography.Text>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: '0.9rem', background: '#fff' }}>
                <Col style={{ margin: '0 0 0.9rem 0.9rem'}} span={23}>
                    <div>
                        <Typography.Text
                            strong
                            style={{ fontSize: '1.4rem' }}
                        >
                            Đánh giá - Nhận xét
                        </Typography.Text>
                    </div>
                    <Rate
                        value={userVote === undefined ? 0 : userVote.star}
                        onChange={handleClickRate}
                    />
                    <div style={{ marginBottom: '0.5rem' }}>
                        <Typography.Text>Bình luận</Typography.Text>
                    </div>
                    <div>
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
                                <Comment
                                    comment={comment}
                                    setCommentList={setCommentList}
                                    key={index}
                                />
                            )
                        }
                    })}
                </Col>
            </Row>
        </>
    )
}

export default BookDetail;