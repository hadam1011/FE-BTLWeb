import { Row, Pagination, Typography, Divider } from 'antd';
import { useContext, useState } from 'react';
import CardBook from "./cardBook";
import { AppContext } from '../../context/appContext';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { bookList } = useContext(AppContext);

    const handleChangePagination = (page, pageSize) => {
        setCurrentPage(page);
    };

    const renderCard = () => {
        const itemsPerPage  = 12;
        const startItem = (currentPage - 1) * itemsPerPage;
        const endItem = Math.min(currentPage * itemsPerPage, bookList.length);

        const cards = [];

        for (let i = startItem; i < endItem; i++) {
            cards.push(<CardBook book={bookList[i]} key={i}/>);
        }

        return cards;
    }

    return (
        <>
            <div>Filter</div>
            <Divider />
            <Typography.Title style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}> 
                Products
            </Typography.Title>
            <Row gutter={[16, 16]} >
                {renderCard()}
            </Row>
            <Pagination
                pageSize={12}
                current={currentPage}
                total={bookList.length}
                hideOnSinglePage
                onChange={handleChangePagination}
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    justifyContent: 'center',
                }}
            />
        </>
    )
}

export default Products;