import React, { useState } from 'react'
import AdminSidebar from '../../../Sidebar/AdminSidebar'
import AdminInfo from '../../../MyInfo/AdminInfo';
import { Tabs } from 'antd';
import "./AdminDashboard.scss";
import RegisterRequest from '../../../Admin/RegisterRequest/RegisterRequest';
import AccountList from '../../../Admin/AccountList/AccountList';
import BlockedAccount from '../../../Admin/BlockedAccount/BlockedAccount';
import RefuseList from '../../../Admin/Refuse/RefuseList';
import ThongKePhanHoi from '../../../Admin/ThongKeTuongTac/ThongKePhanHoi';
import ThongKeBaiDangKS from '../../../Admin/ThongKeTuongTac/ThongKeBaiDangKS';

const { TabPane } = Tabs;
function AdminDashboard() {

    const [tag, setTag] = useState();

    const chonTag = (temp) => {
        setTag(temp)

    }

    return (
        <div className='admin-dashboardContainer'>
            <div className='navbarBackground'>

            </div>
            <div className='dashboard-content'>

                <div className='left'>
                    <AdminSidebar chonTag={chonTag}></AdminSidebar>
                </div>
                <div className='right'>

                    {tag == "thongTinCaNhan" && <AdminInfo id={localStorage.getItem("id")}></AdminInfo>}

                    {tag == "yeuCauDangKy" && <RegisterRequest id={localStorage.getItem("id")}></RegisterRequest>}

                    {tag == "danhSachTaiKhoan" &&

                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Danh sách tài khoản hoạt động" key="1">
                                <AccountList ></AccountList>
                            </TabPane>
                            <TabPane tab="Danh sách tài khoản bị khóa" key="2">
                                <BlockedAccount></BlockedAccount>
                            </TabPane>
                            <TabPane tab="Danh sách tài khoản bị từ chối" key="3">
                                <RefuseList></RefuseList>
                            </TabPane>


                        </Tabs>
                    }

                    {tag == "thongKeTuongTac" &&
                    
                    <Tabs defaultActiveKey="1" >
                            <TabPane tab="Danh sách phản hồi" key="1">
                                <ThongKePhanHoi></ThongKePhanHoi>
                            </TabPane>
                            <TabPane tab="Danh sách khách sạn" key="2">
                                <ThongKeBaiDangKS></ThongKeBaiDangKS>
                            </TabPane>



                        </Tabs>

                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard