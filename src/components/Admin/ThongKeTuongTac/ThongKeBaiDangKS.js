import React, { useEffect, useState, useForm } from 'react'
import { Table, message, Form, Spin, Input, Space, Select, Popconfirm, InputNumber,DatePicker } from 'antd';
import { axios } from "../../../axios"
import Popup from '../../Popup';
import Button from '@mui/material/Button';
import BinhLuan from '../../User/Comment/BinhLuan';
import moment from "moment";
import ResultCard from '../../Cards/ResultCard';
const { Option } = Select;
const { RangePicker } = DatePicker;
function ThongKeBaiDangKS() {

    const [danhSach, setDanhSach] = useState([]);
    const [danhSach2, setDanhSach2] = useState([]);


    const getData = () => {
        axios
            .get('/hotel')
            .then(res => {
               
                setDanhSach2(res.data)
                setDanhSach(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }


    


    useEffect(() => {
        getData();
    }, [])


    const chonMocThoiGian = (value) => {
        if (value) {
            let hienTai = new Date();
            let a = danhSach2.filter(item=>{
                return moment(item.created_at) > value[0] && moment(item.created_at) < value[1]
            })
            setDanhSach(a);
            // switch (value) {
            //     case "1tuan":
            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.created_at)) < 604800 * 1000;
            //         })
            //         setDanhSach(a);
            //         break;
            //     case "1thang":

            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.created_at)) < 2592000 * 1000;
            //         })
            //         setDanhSach(a);

            //         break;
            //     case "3thang":
            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.created_at)) < 7776000 * 1000;
            //         })
            //         setDanhSach(a);
            //         break;
            //     case "1nam":
            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.created_at)) < 31104000 * 1000;
            //         })
            //         setDanhSach(a);

            //         break;
            // }

        }
        else {
            setDanhSach(danhSach2);
            // console.log("khong co dulieu")
        }
    }

    return (
        <div className='phanHoiAdmin-container'>
            <h1>Danh sách bài đăng khách sạn </h1>

            <Form.Item label="Khung thời gian gần đây" name="vaiTro"

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
            <br></br>
            Có: {danhSach.length} kết quả
            <br></br>
            <br></br>
            {danhSach.map(item => {
                return (
                    <div key={item.id} style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>

                        <ResultCard
                            id={item.id}
                            key={item.id}
                            tenKhachSan={item.tenKhachSan}
                            moTa={item.moTa}
                            diaChi={item.diaChi}
                            chatLuong={item.chatLuong}
                            luotDanhGia={item.luotDanhGia}
                            dienTich={item.dienTich}
                            hinhAnh={item.hinhAnh}
                            soDienThoai={item.soDienThoai}
                            email={item.email}
                            img={
                                item.hinhAnh != null ? Object.values(JSON.parse(item.hinhAnh))[0]
                                    :
                                    "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
                            }
                        ></ResultCard>

                    </div>
                )
            })}
        </div>
    )
}

export default ThongKeBaiDangKS