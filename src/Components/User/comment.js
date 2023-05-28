import { Divider, Row, Col, Avatar, Typography, Rate, Popconfirm, notification } from "antd";
import { useState } from "react";
import { UserOutlined  } from "@ant-design/icons"

const Comment = ({ comment, setStar }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [api, contextHolder] = notification.useNotification();
    const [book, setBook] = useState({});

    const getBook = async () => {
        const response = await fetch(`http://localhost:8080/books/${comment.bookid}`)
        let data = await response.json();
        setBook(data);
    }

    const handleDeleteComment = () => {
        var options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const fetchDelete = async () => {
            const response = await fetch(`http://localhost:8080/comment/${comment.commentid}`, options);
            await getBook();
            setStar(Math.floor(book.star / book.comment));
            window.localStorage.setItem('render', JSON.stringify({ check: true }));
            api["success"]({
                message: "Thành công",
                description: "Xóa bình luận thành công",
            });
        }
        fetchDelete();
    }

    return (
        <>
            {contextHolder}
            <Row>
                <Col span={5}>
                    <Avatar
                        size={48}
                        icon={<UserOutlined />}
                        style={{marginRight: '0.5em'}}
                    />
                    <Typography.Text strong>{comment.username}</Typography.Text>
                </Col>
                <Col span={16}>
                    <Rate disabled defaultValue={comment.star} /><br />
                    <Typography.Text>{comment.content}</Typography.Text>
                </Col>
                <Popconfirm
                    title="Xóa comment?"
                    onConfirm={handleDeleteComment}
                >
                    <Typography.Link
                        style={{
                            marginTop: '1em',
                            color: 'blue'
                        }}
                        hidden={comment.userid !== user.id}
                    >
                        Xóa comment
                    </Typography.Link>
                </Popconfirm>
            </Row>
            <Divider />
        </>
    )
}

export default Comment;