import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Form, Spin, Input, Space, Select, Popconfirm, InputNumber,DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';
import moment from "moment";
import { axios } from '../../../axios';
import BinhLuan from '../../User/Comment/BinhLuan';

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const { RangePicker } = DatePicker;
const { Option } = Select;

function Feedback() {


    const [danhSachKhachSan, setDanhSachKhachSan] = useState([]);


    const [danhSachDanhGia, setDanhSachDanhGia] = useState([]);
    const [danhSachDanhGia2, setDanhSachDanhGia2] = useState([]);

    const getData = () => {
        axios
            .get('/danhGia/toanBoDanhGiaVeQuanLy')
            .then(res => {
                console.log(res.data.reverse())
                setDanhSachDanhGia(res.data.reverse())
                setDanhSachDanhGia2(res.data.reverse())
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get("/hotelManager/Myhotel")
            .then(res => {
                // console.log(res);
                setDanhSachKhachSan(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }
    const luuTenKhachSan = (value) => {

        if (value) {
            let a = danhSachDanhGia2.filter(item => {
                return item.tenKhachSan === value
            })
            setDanhSachDanhGia(a);
        }
        else {
            setDanhSachDanhGia(danhSachDanhGia2)
        }

    }


    const chonMocThoiGian = (value) => {
        if (value) {
            let hienTai = new Date();
            let a = danhSachDanhGia2.filter(item=>{
                return moment(item.ngayDanhGia) > value[0] && moment(item.ngayDanhGia) < value[1]
            })
            setDanhSachDanhGia(a);


            // switch (value) {
            //     case "1tuan":
            //         a = danhSachDanhGia2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 604800 * 1000;
            //         })
            //         setDanhSachDanhGia(a);

            //         break;
            //     case "1thang":
            //         a = danhSachDanhGia2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 2592000 * 1000;
            //         })
            //         setDanhSachDanhGia(a);


            //         break;
            //     case "3thang":
            //         a = danhSachDanhGia2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 7776000 * 1000;
            //         })
            //         setDanhSachDanhGia(a);


            //         break;
            //     case "1nam":
            //         a = danhSachDanhGia2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 31104000 * 1000;
            //         })
            //         setDanhSachDanhGia(a);


            //         break;
            // }

        }
        else {
            setDanhSachDanhGia(danhSachDanhGia2)
            // console.log("khong co dulieu")
        }
      

    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='feedback-container'>
            <h2>Phản hồi</h2>


            <br></br>
            <br></br>
            <div className='thongKe' style={{ display: 'flex', justifyContent: 'space-between', width: "70%" }}>

                <Form.Item label="Tên khách sạn" name="vaiTro"

                >
                    <Select style={{ width: '250px' }}
                        dropdownStyle={{ zIndex: 2000 }}
                        onChange={value => luuTenKhachSan(value)}
                    >
                        <Option value="">Toàn bộ</Option>
                        {danhSachKhachSan.map(item => {
                            return (
                                <Option
                                    key={item.id}
                                    value={item.tenKhachSan}

                                >{item.tenKhachSan}</Option>
                            )
                        })}

                    </Select>
                </Form.Item>
                &nbsp;&nbsp;&nbsp;
                <Form.Item label="Khung thời gian" name="vaiTro"

                >
                      <RangePicker onChange={value=>chonMocThoiGian(value)}/>
                    {/* <Select style={{ width: '250px' }}
                        dropdownStyle={{ zIndex: 2000 }}
                        onChange={value => chonMocThoiGian(value)}
                    >
                        <Option value="">Toàn bộ</Option>
                        <Option value="1tuan">1 tuần</Option>
                        <Option value="1thang">1 tháng </Option>
                        <Option value="3thang">3 tháng </Option>
                        <Option value="1nam">1 năm </Option>
                    </Select> */}
                </Form.Item>

            </div>


            <br></br>
            <h2>Danh sách phản hồi</h2>
            <br></br>

            <br></br>
            {danhSachDanhGia.map(item => {
                return (
                    <div key={item.id}>
                        <BinhLuan
                            noiDung={item.noiDung}
                            ngayDanhGia={item.ngayDanhGia}
                            maPhong={item.maPhong}
                            tenKhachSan={item.tenKhachSan}
                            email={item.email}
                            anhDaiDien={item.anhDaiDien != null ? Object.values(JSON.parse(item.anhDaiDien)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}
                        >

                        </BinhLuan>
                    </div>
                )
            })}
        </div>
    )
}

export default Feedback