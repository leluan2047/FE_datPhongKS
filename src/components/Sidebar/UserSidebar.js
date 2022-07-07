import React, { useEffect } from 'react'
import './UserSidebar.scss';
import { axios } from "../../axios";
import { useNavigate } from 'react-router-dom';
function UserSidebar(props) {

    const navigate = useNavigate();
    useEffect(() => {
        props.chonTag("thongTinCaNhan");
    }, [])

    return (
        <div className='userSidebar-container'>
            <div className='user-avatar'>
            <img src={localStorage.getItem("hinhAnh")}></img>
            </div>
            <hr></hr>
            <div className='menu'>
                <div className='menu-item' onClick={e => props.chonTag("thongTinCaNhan")}>
                    <i class="fa-solid fa-user"></i> Thông tin cá nhân
                </div>
                <div className='menu-item' onClick={e => props.chonTag("lichSuDatPhong")}>
                    <i class="fa-solid fa-clock-rotate-left"></i>Lịch sử đặt phòng
                </div>

                <div className='menu-item' onClick={e => props.chonTag("lichSuPhanHoi")}>
                    <i class="fa-solid fa-comment"></i> Lịch sử phản hồi
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

export default UserSidebar