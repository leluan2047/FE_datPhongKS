import React, { useEffect,useState ,useRef} from 'react'
import Cards from '../Cards/Card'
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from 'react-elastic-carousel';
// Import Swiper styles
import 'swiper/css';
import "./MainPage.scss"
import MediaCard from '../Cards/MediaCard';
import {axios} from "../../axios";
import { Routes, Route, useParams,useNavigate } from 'react-router-dom';
function MainPage() {

  const [danhSachPhong, setDanhSachPhong] = useState([]);
  const navigate = useNavigate();

  const myRef = useRef(null)

  


  const getData = () => {

    axios
      .get('/room')
      .then(res => {
        setDanhSachPhong(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {
    getData();

  }, [])


  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1100, itemsToShow: 3 },
  ]

  const data = [
    'https://tmshotel.vn/uploads/images/1_1.webp',
    'https://tmshotel.vn/uploads/images/1_1.webp',
    'https://tmshotel.vn/uploads/images/1_1.webp',
    'https://tmshotel.vn/uploads/images/1_1.webp',
    'https://tmshotel.vn/uploads/images/1_1.webp',
    'https://tmshotel.vn/uploads/images/1_1.webp',
  ];

  return (
    <div className='mainPage-container'>

      <div>
        <div id = '1'></div>
        <Cards ></Cards>
        {/* <Swiper className='swiper-container'
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          loop={true}
          autoplay={{
            delay: 3000
          }}
        >
          <SwiperSlide className='swiper-slide'><img src='https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=320'></img></SwiperSlide>
          <SwiperSlide className='swiper-slide'><img src='https://media.cntraveler.com/photos/5d827bb077061d0008731f5f/16:9/w_4000,h_2250,c_limit/1-Hotel-West-Hollywood_2019_Pool_157.jpg'></img></SwiperSlide>
          <SwiperSlide className='swiper-slide'><img src='https://www.andreus-resorts.it/typo3conf/ext/bn_typo_dist/Resources/Public/client/Bilder/Bildauswahl_Kunde_21.11.18/Yoga_Meditation/_bp_170991_web.jpg'></img></SwiperSlide>
          <SwiperSlide className='swiper-slide'><img src='https://hotel-theyard.berlin/wp-content/uploads/2017/07/Bistro-the-YARD_BCD0084_Homepage.jpg'></img></SwiperSlide>

        </Swiper> */}

        <h1 >Một vài gợi ý cho bạn</h1>
        <br id = '3'></br>
       
        <Carousel breakPoints={breakPoints}  >
          {
            danhSachPhong.map(item => {
              return (
                <MediaCard
                  id={item.id}
                  key={item.id}
                  src={item.hinhAnh}
                  donGia={item.donGia}
                  soGiuong={item.soGiuong}
                  maPhong={item.maPhong}
                  dienTich={item.dienTich}
                ></MediaCard>
              );
            })
          }
        </Carousel>
        
        <br></br>
        <h1 >Một số khách sạn được yêu thích</h1>
        
        <br></br>
        <Carousel breakPoints={breakPoints}>
          {
            danhSachPhong.reverse().map(item => {
              return (
                <MediaCard
                  id={item.id}
                  key={item.id}
                  src={item.hinhAnh}
                  donGia={item.donGia}
                  soGiuong={item.soGiuong}
                  maPhong={item.maPhong}
                  dienTich={item.dienTich}
                ></MediaCard>
              );
            })
          }
        </Carousel>
        <br id ='2'></br>
        <br></br>
        <br></br>
        <h1>Một số bãi biển nổi tiếng</h1>
        <div className='circle'>
          <div className='circle-image' onClick={e=>navigate('/search/vung tau')}>
            <img src='https://photo-cms-vovworld.zadn.vn/w500/Uploaded/vovworld/yzfsm/2019_09_23/vungtau_MWEG.jpg'></img>
            <p>Vũng Tàu</p>
          </div>
          <div className='circle-image' onClick={e=>navigate('/search/lang co')}>
            <img src='http://mattranthuathienhue.vn/wp-content/uploads/2019/01/huyen-thoai-bien-lang-co-o-dau-1-1024x683.jpg'></img>
            <p>Lăng Cô</p>
          </div>
          <div className='circle-image' onClick={e=>navigate('/search/mui ne')}>
            <img src='https://letstours.com/wp-content/uploads/2019/08/mui-ne.jpg'></img>
            <p>Mũi Né</p>
          </div>
          <div className='circle-image' onClick={e=>navigate('/search/my khe')}>
            <img src='https://thuexegiare.net/wp-content/uploads/2021/03/bai-tam-bien-my-khe-da-nang-1.jpg'></img>
            <p>Mỹ Khê</p>
          </div>
          <div className='circle-image' onClick={e=>navigate('/search/nha trang')}>
            <img src='https://cdn1.nhatrangtoday.vn/images/photos/bai-bien-nha-trang-4.jpg'></img>
            <p>Nha Trang</p>
          </div>
        </div>
      </div >
    </div >
  )
}

export default MainPage