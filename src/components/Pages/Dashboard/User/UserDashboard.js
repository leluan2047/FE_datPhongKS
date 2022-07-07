import React, { useState } from 'react'
import HotelList from '../../../HotelDirector/Hotel/HotelList';
import HotelDirecSidebar from "../../../Sidebar/HotelDirectorSidebar"
import { Tabs } from 'antd';
import "./UserDashboard.scss"
import UserSidebar from '../../../Sidebar/UserSidebar';
import AdminInfo from '../../../MyInfo/AdminInfo';
import BookHistory from '../../../User/Booking/BookHistory';
import LichSuPhanHoi from '../../../User/Comment/LichSuPhanHoi';

const { TabPane } = Tabs;
function UserDashboard() {

    const [tag, setTag] = useState();

    const chonTag = (temp) => {
        setTag(temp)

    }

    return (
        <div className='user-dashboardContainer'>
            <div className='navbarBackground'>

            </div>
            <div className='dashboard-content'>

                <div className='left'>
                    <UserSidebar chonTag={chonTag}></UserSidebar>
                </div>
                <div className='right'>
                    {tag == "thongTinCaNhan" && <AdminInfo id={localStorage.getItem("id")}></AdminInfo>}
                    {tag == "lichSuDatPhong" && <BookHistory></BookHistory>}
                    {tag == "lichSuPhanHoi" && <LichSuPhanHoi></LichSuPhanHoi>}
                </div>
            </div>
        </div>
    )
}

export default UserDashboard