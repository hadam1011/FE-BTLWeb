import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotAuthorPage = () => {
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/');
    }
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={handleClickBack}>Back Home</Button>}
        />
    )
}

export default NotAuthorPage;