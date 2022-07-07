import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './Card.scss';
import CardItem from './CardItem';

function Cards() {
    return (
        <div className='card-container'>
            <div className='cards'>
                <SearchBox></SearchBox>
                <h1>Điểm đến nổi bật nhất mùa du lịch năm nay !</h1>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            <CardItem
                                src='https://cdn1.ivivu.com/iVivu/2021/12/15/18/a2-800x450.jpg'
                                text='Thành phố Hồ Chí Minh nằm ở giữa vùng Nam Bộ trù phú, là thành phố đông dân và lớn nhất Việt Nam.'
                                label='TP Hồ Chí Minh'
                                path='/search/ho chi minh'
                            />
                            <CardItem
                                src='https://statics.vinpearl.com/du-lich-Hue-Da-Nang-hinh-anh1.jpg'
                                text='nơi được mệnh danh là “thành phố đáng đến nhất Việt Nam” – nơi đây đang dần trở thành điểm sáng của cả nước trong lĩnh vực du lịch'
                                label='TP. Đà Nẵng'
                                path='/search/đà nẵng'
                            />
                        </ul>
                        <ul className='cards__items'>
                            <CardItem
                                src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Ngomon2.jpg'
                                text='Huế là vùng đất có lịch sử văn hóa lâu đời, có nhiều địa điểm du lịch Huế hấp dẫn, nhiều danh lam thắng cảnh'
                                label='TP. Huế'
                                path='/search/hue'
                            />
                            <CardItem
                                src='https://cdn3.ivivu.com/2015/11/du-lich-da-lat-ivivu1-540x305.jpg'
                                text='Đà Lạt là thủ phủ của tỉnh Lâm Đồng. Với độ cao 1.500 m trên mặt nước biển, tiết trời Đà Lạt mát lạnh, là nơi nghỉ dưỡng lý tưởng ở khu vực miền Nam'
                                label='Đà Lạt'
                                path='/search/da lat'
                            />
                            <CardItem
                                src='https://www.acvn.vn/image/data/do-thi-tieu-bieu/Ha-Noi-19.jpg'
                                text='Sở hữu nét đẹp đa diện, dung hoà giữa hiện đại và truyền thống'
                                label='TP. Hà Nội'
                                path='/search/ha noi'
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;


