import React, { useState } from 'react'
import HotelList from '../../../HotelDirector/Hotel/HotelList';
import HotelDirecSidebar from "../../../Sidebar/HotelDirectorSidebar"
import { Tabs } from 'antd';
import "./HotelDirectorDB.scss"
import ServiceList from '../../../HotelDirector/Service/ServiceList';
import RoomList from '../../../HotelDirector/Room/RoomList';
import FurnitureList from '../../../HotelDirector/Furniture/FurnitureList';
import AdminInfo from '../../../MyInfo/AdminInfo';
import BookRequest from '../../../HotelDirector/Booking/BookRequest';
import BookHistoryofHotelDir from '../../../HotelDirector/Booking/BookHistoryofHotelDir';
import Statistical from '../../../HotelDirector/Booking/Statistical';
import Feedback from '../../../HotelDirector/Feedback/Feedback';

const { TabPane } = Tabs;
function HotelDirectorDB() {

    const [tag, setTag] = useState();

    const chonTag = (temp) => {
        setTag(temp)

    }

    return (
        <div className='hotelDirector-dashboardContainer'>
            <div className='navbarBackground'>

            </div>
            <div className='dashboard-content'>

                <div className='left'>
                    <HotelDirecSidebar chonTag={chonTag}>
                    </HotelDirecSidebar>
                </div>
                <div className='right'>
                    {tag == "quanLyKhachSan" ?

                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Danh sách khách sạn" key="1">
                                <HotelList></HotelList>
                            </TabPane>
                            <TabPane tab="Danh sách dịch vụ" key="2">
                                <ServiceList></ServiceList>
                            </TabPane>
                            <TabPane tab="Danh sách phòng" key="3">
                                <RoomList></RoomList>
                            </TabPane>
                            <TabPane tab="Danh sách nội thất" key="4">
                                <FurnitureList></FurnitureList>
                            </TabPane>

                        </Tabs>
                        :
                        ""}
                    {tag == "thongTinCaNhan" ?
                        <AdminInfo id={localStorage.getItem("id")}></AdminInfo>
                        :
                        ""
                    }
                    {tag == "yeuCauDatPhong" ?
                        <BookRequest ></BookRequest>
                        :
                        ""
                    }
                    {tag == "danhSachNo" ?
                        <BookHistoryofHotelDir></BookHistoryofHotelDir>
                        :
                        ""
                    }
                     {tag == "thongKeDoanhThu"?
                        <Statistical></Statistical>
                        :
                        ""
                    }
                    {tag =="phanHoi"?
                        <Feedback></Feedback>
                        :
                        ""
                    }

                </div>
            </div>
        </div>
    )
}

export default HotelDirectorDB