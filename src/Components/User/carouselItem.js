import { Typography, Carousel, Avatar  } from 'antd';
import '../../App.css';

const CarouselItem = () => {    
    const contentStyle = {
        height: '15rem',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
      };    

    return (
        <>
            <Carousel autoplay className='carousel-container'>
                <div>
                    <div style={contentStyle}>
                        <Avatar
                            size={230}
                            src="https://www.nxbtre.com.vn/Images/Writer/nxbtre_thumb_30552016_085555.jpg"
                        />
                        <div style={{maxWidth: '35rem'}}>
                            <Typography.Text italic style={{fontSize: '1.1rem'}}> 
                                "Tất cả những gì người lớn dạy dỗ đều đúng về mặt lý thuyết, bọn trẻ đều thấy vậy. Nhưng bọn chúng vẫn có một sự thôi thức vô hình làm cho khác đi trong thực tế."
                            </Typography.Text><br/>
                            <Typography.Text style={{fontSize: '1rem'}}>
                                Cho tôi xin một vé đi tuổi thơ - Nguyễn Nhật Ánh 
                            </Typography.Text>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                            <Avatar
                                size={230}
                                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT1CGnZ20sa5AgcQuFfRClCkLn_99sBMWHFwPYtL-dZxOOo8nfm"
                            />
                            <div style={{maxWidth: '35rem'}}>
                                <Typography.Text italic style={{fontSize: '1.1rem'}}> 
                                    "When you love you wish to do things for. You wish to sacrifice for. You wish to serve."
                                </Typography.Text><br/>
                                <Typography.Text style={{fontSize: '1rem'}}>
                                    Ernest Hemingway
                                </Typography.Text>
                            </div>
                        </div>
                    </div>
                <div>
                <div style={contentStyle}>
                        <Avatar
                            size={230}
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKOnWtqrxRinYcXQKOapXL4uAp6Ict7z3d6ZdBg2zO5JsQ2Wrg"
                        />
                        <div style={{maxWidth: '35rem'}}>
                            <Typography.Text italic style={{fontSize: '1.1rem'}}> 
                                "When we strive to become better than we are, everything around us becomes better too."
                            </Typography.Text><br/>
                            <Typography.Text style={{fontSize: '1rem'}}>
                                Paulo Coelho
                            </Typography.Text>
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    )
}

export default CarouselItem;