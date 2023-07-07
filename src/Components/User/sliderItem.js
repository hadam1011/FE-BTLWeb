import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Divider, Typography } from 'antd';
import '../../App.css';
import AuthorCard from './authorCard';

const SliderItem = ({bookList}) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const renderCard = () => {
        const cards = [];

        for (let i = 0; i < bookList.length; i++) {
            cards.push(<AuthorCard />);
        }

        return cards;
    }

    return (
        <div style={{
            alignItems: 'center',
        }}>
            <Divider />
            <Typography.Title style={{fontSize: '2rem'}}>
                Famous author
            </Typography.Title>
            <Carousel
                className='carousel-container'
                responsive={responsive}
            >
                {renderCard()}
            </Carousel>
            <Divider />
        </div>
    )
}

export default SliderItem;