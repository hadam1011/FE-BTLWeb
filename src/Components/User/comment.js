import { Divider, Row, Col, Avatar, Typography, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons"
import * as commentService from "../../services/commentServices"

const Comment = ({ comment, setCommentList }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const callApi = async () => {
        const data = await commentService.getAllComment();
        setCommentList(data);
    }

    const handleDeleteComment = () => {
        const fetchDelete = async () => {
            await commentService.deleteComment(comment.commentid);
            await callApi();
        }
        fetchDelete();
    }

    return (
        <>
            <Row>
                <Col span={5}>
                    <Avatar
                        size={48}
                        icon={<UserOutlined />}
                        style={{marginRight: '0.5rem'}}
                    />
                    <Typography.Text strong>{comment.username}</Typography.Text>
                </Col>
                <Col xs={10} xl={15}>
                    <Typography.Text>{comment.content}</Typography.Text>
                    <br></br>
                    <Typography.Text
                        style={{
                            opacity: '0.8',
                            fontStyle: 'italic',
                            fontSize: '0.8rem'
                        }}
                    >
                        {comment.date}
                    </Typography.Text>
                </Col>
                <Popconfirm
                    title="Xóa comment?"
                    onConfirm={handleDeleteComment}
                >
                    <Typography.Link
                        style={{
                            marginTop: '1rem',
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