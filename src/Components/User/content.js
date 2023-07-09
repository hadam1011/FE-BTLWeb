import { Breadcrumb, Row, Pagination, Typography } from 'antd';
import CardBook from "./cardBook";
import { HomeOutlined, RightOutlined } from '@ant-design/icons'
import { useState } from 'react';
import CarouselItem from './carouselItem';
import TrendingItem from './trendingItem';
import BestPriceItems from './bestPriceItem';

const Contents = ({ bookList }) => {
    const [currentPage, setCurrentPage] = useState(1);

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
        <div>
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
                    }
                ]}
            />
            <TrendingItem bookList={bookList} />
            <BestPriceItems bookList={bookList} />
            <Typography.Title style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}> 
                All books
            </Typography.Title>
            <Row gutter={[16, 16]} >
                {renderCard()}
            </Row>
            <CarouselItem />
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
        </div>
    )
}

export default Contents;