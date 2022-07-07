import React, { useState,useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber
} from 'antd';
import 'antd/dist/antd.css'
import './SearchResults.scss';
import ResultCard from '../Cards/ResultCard';
import { Routes, Route, useParams,useNavigate } from 'react-router-dom';
import moment from "moment"
import { axios } from "../../axios";

const { RangePicker } = DatePicker;
const rangeConfig = {
    rules: [
        {
            type: 'array',

            message: 'Vui lòng nhập thông tin',
        },
    ],
};
function SearchResults() {

    const [danhSachTK, setDanhSachTK] = useState([]);
    const [ngayNhan, setNgayNhan] = useState();
    const [ngayTra, setNgayTra] = useState();
    let { destination } = useParams();

    const navigate = useNavigate();
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    };
    const onFinish = (values) => {
        navigate(`/search/${ values.diaDiem? values.diaDiem:" /"}`   ); 
        axios
            .post("/hotel/search", {
                diaChi: values.diaDiem ? values.diaDiem : "",
                tenKhachSan: values.tenKhachSan ? values.tenKhachSan : "",
                ngayNhan: ngayNhan ? ngayNhan : "",
                ngayTra: ngayTra ? ngayTra : ""
            })
            .then(res => {

                setDanhSachTK(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    };
    useEffect(()=>{
        window.scrollTo(0, 0);

        axios
            .post("/hotel/search", {
                diaChi: destination ? destination : " ",
                tenKhachSan:  "",
                ngayNhan: "",
                ngayTra: ""
            })
            .then(res => {

                setDanhSachTK(res.data)
                
            })
            .catch(err => {
                console.log(err)
            })
        
    },[])

    const onchanges = (value, dateString) => {
        if (dateString) {
            setNgayNhan(dateString[0])
            setNgayTra(dateString[1])
        }


    }

    return (
        <div className='searchResults-container-total'>
            <div className='navbarBackground'>

            </div>
            <div className='searchResults-container'>

                <div className='form-results'>
                    <h3>Tìm kiếm thông tin</h3>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        onFinish={onFinish}
                        style={{ width: '330px' }}
                    >
                        <label>Địa điểm</label>
                        <Form.Item
                            name='diaDiem' 
                            
                            rules={[
                                {

                                    message: 'Vui lòng nhập thông tin',
                                },
                            ]}
                        >
                            <Input style={{ width: '250px' }} defaultValue={destination}  />
                        </Form.Item>

                        <label>Tên khách sạn</label>
                        <Form.Item
                            name='tenKhachSan'

                        >
                            <Input style={{ width: '250px' }} />
                        </Form.Item>


                        <label>Ngày</label>
                        <Form.Item name="ngay" {...rangeConfig} >
                            <RangePicker
                                style={{ width: '250px' }}
                                onChange={onchanges}
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime
                                disabledDate={disabledDate} />
                        </Form.Item>

                      

                        <Form.Item >
                            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='results'>
                    {danhSachTK.map(item => {
                        return (
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
                        )
                    })}
                    {danhSachTK.length?"":<h2>Không tìm thấy kết quả phù hợp</h2>}
                </div>
            </div>
        </div>

    )
}

export default SearchResults