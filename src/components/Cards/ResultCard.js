import React from 'react'
import { Link } from 'react-router-dom';
import Popup from '../Popup';
import HotelDetail from '../SearchResults/HotelDetail';
import "./ResultCard.scss";

function ResultCard(props) {
    return (
        <div className='ResultCard-container'>
            <div className='left'>
                <div className='image'>
                    <img src={props.img}></img>
                </div>
                <div className='moreInfo'>
                    <div className='title'>
                        {props.tenKhachSan}
                    </div>
                    <div className='content'>
                        Người quản lý: {props.email}
                    </div>
                    <div className='content'>
                        Số điện thoại: {props.soDienThoai}
                    </div>
                    <div className='content'>
                        Diện tích: {props.dienTich} m2
                    </div>
                    <div className='content'>
                        Địa chỉ:  {props.diaChi}
                    </div>

                    <div className='content'>
                        {props.moTa}
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='point'>
                    {props.chatLuong}
                </div>
                <div className=''>
                   {props.luotDanhGia} lượt đánh giá
                </div>
                
                <div className='price'>

                </div>
                <div className='button' >
                    <button>
                        <Link to={`/hotelDetail/${props.id}`} style={{color:'white'}}>
                         Xem chi tiết

                           </Link>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ResultCard