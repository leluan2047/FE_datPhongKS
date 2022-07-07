import React, { useState ,useEffect} from 'react'
import './HotelDirectorSidebar.scss';
import { axios } from "../../axios";
import { useNavigate } from 'react-router-dom';
function HotelDirectorSidebar(props) {

    const navigate = useNavigate();
    const [tag, setTag] = useState();
    useEffect(() => {
        props.chonTag("thongTinCaNhan");
    }, [])
    return (
        <div className='hotelDirectorSidebar-container'>
            <div className='hotelDirector-avatar'>
                <img src={localStorage.getItem("hinhAnh")}></img>
            </div>
            <hr></hr>
            <div className='menu'>
                <div className='menu-item' onClick={e => props.chonTag("thongTinCaNhan")}>
                    <i class="fa-solid fa-user"></i> Thông tin cá nhân
                </div>
                <div className='menu-item' onClick={e => props.chonTag("quanLyKhachSan")}>
                    <i class="fa-solid fa-hotel"></i> Quản lý khách sạn
                </div>
                <div className='menu-item' onClick={e => props.chonTag("yeuCauDatPhong")}>
                    <i class="fa-solid fa-house-circle-exclamation"></i> Yêu cầu đặt phòng
                </div>
                <div className='menu-item' onClick={e => props.chonTag("danhSachNo")}>
                    <i class="fa-solid fa-chart-area" ></i> Danh sách nợ
                </div>
                <div className='menu-item' onClick={e => props.chonTag("thongKeDoanhThu")}>
                    <i class="fa-solid fa-chart-column"></i> Thống kê doanh thu
                </div>
                <div className='menu-item' onClick={e => props.chonTag("phanHoi")}>
                    <i class="fa-solid fa-comment"></i> Phản hồi
                </div>
                <hr></hr>
                <div className='menu-item'
                    onClick={
                        e => {

                            axios
                                .get("/logout")
                                .then(res => {
                                    localStorage.clear()
                                    window.alert("Đăng xuất thành công")
                                    navigate('/')
                                    // console.log(res)

                                })
                                .catch(err => {
                                    localStorage.clear()
                                    console.log(err);
                                })
                        }
                    }
                >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> logout
                </div>
            </div>
        </div>
    )
}

export default HotelDirectorSidebar;