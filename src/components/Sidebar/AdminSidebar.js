import React, { useEffect } from 'react'
import './AdminSidebar.scss';
import { axios } from "../../axios";
import { useNavigate } from 'react-router-dom';
function AdminSidebar(props) {

    const navigate = useNavigate();
    useEffect(() => {
        props.chonTag("thongTinCaNhan");
    }, [])

    return (
        <div className='adminSidebar-container'>
            <div className='admin-avatar'>
            <img src={localStorage.getItem("hinhAnh")}></img>
            </div>
            <hr></hr>
            <div className='menu'>
                <div className='menu-item' onClick={e => props.chonTag("thongTinCaNhan")}>
                    <i class="fa-solid fa-user"></i> Thông tin cá nhân
                </div>
                <div className='menu-item' onClick={e => props.chonTag("yeuCauDangKy")}>
                    <i class="fa-solid fa-person-circle-question"></i>  Yêu cầu đăng ký tài khoản
                </div>
                <div className='menu-item' onClick={e => props.chonTag("danhSachTaiKhoan")}>
                    <i class="fa-solid fa-user-large-slash"></i> Danh sách tài khoản
                </div>
                <div className='menu-item' onClick={e => props.chonTag("thongKeTuongTac")}>
                    <i class="fa-solid fa-chart-area" ></i> Thống kê tương tác
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
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
                </div>


            </div>
        </div>
    )
}

export default AdminSidebar