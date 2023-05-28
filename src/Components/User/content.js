import { Breadcrumb, Row, Pagination } from 'antd';
import CardBook from "./cardBook";
import { HomeOutlined } from '@ant-design/icons'
import { useState } from 'react';

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
            <Row gutter={[16, 8]}>
                {renderCard()}
            </Row>
            <Pagination
                pageSize={12}
                current={currentPage}
                total={bookList.length}
                hideOnSinglePage
                onChange={handleChangePagination}
                style={{
                    float: 'right',
                    marginTop: '1rem'
                }}
            />
        </div>
    )
}

export default Contents;