import { Row, Pagination, Typography, Divider, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { useContext, useState, useEffect } from 'react';
import CardBook from "./cardBook";
import { AppContext } from '../../context/appContext';
import * as categoryService from '../../services/categoryServices';
import '../../App.css';

const Products = () => {
    const { bookList } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryList, setCategoryList] = useState([]);
    const [displayList, setDisplayList] = useState(bookList);

    useEffect(() => {
        const callApi = async () => {
            const categoryResponse = await categoryService.getAllCategory();

            const categories = categoryResponse.map((category) => {
                return {
                    value: category.category,
                }
            })
            
            setCategoryList(categories);
        }
        callApi();
    }, [])

    useEffect(() => {
        setDisplayList(bookList);
    }, [bookList])

    const handleChangePagination = (page, pageSize) => {
        setCurrentPage(page);
    };

    const renderCard = () => {
        const itemsPerPage  = 12;
        const startItem = (currentPage - 1) * itemsPerPage;
        const endItem = Math.min(currentPage * itemsPerPage, displayList.length);

        const cards = [];

        for (let i = startItem; i < endItem; i++) {
            cards.push(<CardBook book={displayList[i]} key={i}/>);
        }

        return cards;
    }

    const handleSelectChange = (value) => {
        const newList = value === 'All products'
            ? bookList
            : bookList.filter((book) => {
                return book.category === value;
            })
        setDisplayList(newList);
    }

    const handleSearch = (e) => {
        const key = e.target.value.toLowerCase();
        const newList = bookList.filter((book) => {
            return book.title.toLowerCase().includes(key);
        })
        key === ''
            ? setDisplayList(bookList)
            : setDisplayList(newList);
    }

    return (
        <>
            <div className='filter-container'>
                <Input
                    style={{
                        width: '30%',
                        borderRadius: '2rem'
                    }}
                    onPressEnter={handleSearch}
                    prefix={<SearchOutlined />}
                    placeholder='Search products'
                    allowClear
                />
                <div>
                    <Space>
                        <Typography.Text>Category : </Typography.Text>
                        <Select
                            onChange={(value) => handleSelectChange(value)}
                            defaultValue="All products"
                            options={[{value: 'All products'}, ...categoryList]}
                            style={{
                                width: '10rem'
                            }}
                        />
                    </Space>
                </div>
            </div>
            <Divider />
            <Typography.Title className='title-style'> 
                Products
            </Typography.Title>
            <Row gutter={[16, 16]} >
                {renderCard()}
            </Row>
            <Pagination
                pageSize={12}
                current={currentPage}
                total={displayList.length}
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