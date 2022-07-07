import React, { useEffect, useState, useForm } from 'react'
import { Table, message, Form, Spin, Input, Space, Select, Popconfirm, InputNumber,DatePicker } from 'antd';
import { axios } from "../../../axios"
import Popup from '../../Popup';
import Button from '@mui/material/Button';
import BinhLuan from '../../User/Comment/BinhLuan';
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;
function ThongKePhanHoi() {

    const [danhSach, setDanhSach] = useState([]);
    const [danhSach2, setDanhSach2] = useState([]);


    const getData = () => {
        axios
            .get('/danhGia')
            .then(res => {
                console.log(res.data.reverse());
                setDanhSach2(res.data.reverse())
                setDanhSach(res.data.reverse())
            })
            .catch(err => {
                console.log(err)
            })
    }


    const deleteData = (id) => {
        axios
            .get(`/danhGia/destroy/${id}`)
            .then(res => {

                if (res.data === "Xoa thanh cong")
                    message.success("Xóa bình luận thành công")
                else
                    message.error("Xóa bình luận thất bại")
                getData()
            })
            .catch(err => {
                console.log(err)
            })

    }

    const confirm = (id) => {

        deleteData(id)
    };


    useEffect(() => {
        getData();
    }, [])


    const chonMocThoiGian = (value) => {
        if (value) {
            let hienTai = new Date();
            let a = danhSach2.filter(item=>{
                return moment(item.ngayDanhGia) > value[0] && moment(item.ngayDanhGia) < value[1]
            })
            setDanhSach(a);
            // switch (value) {
            //     case "1tuan":
            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 604800 * 1000;
            //         })
            //         setDanhSach(a);
            //         break;
            //     case "1thang":

            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 2592000 * 1000;
            //         })
            //         setDanhSach(a);

            //         break;
            //     case "3thang":
            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 7776000 * 1000;
            //         })
            //         setDanhSach(a);
            //         break;
            //     case "1nam":
            //         a = danhSach2.filter(item => {
            //             return (hienTai - moment(item.ngayDanhGia)) < 31104000 * 1000; 
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
            <h1>Danh sách phản hồi </h1>

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

                        <BinhLuan
                            noiDung={item.noiDung}
                            ngayDanhGia={item.ngayDanhGia}
                            maPhong={item.maPhong}
                            tenKhachSan={item.tenKhachSan}
                            email={item.email}
                            anhDaiDien={item.anhDaiDien != null ? Object.values(JSON.parse(item.anhDaiDien)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}
                        >

                        </BinhLuan>
                        <div style={{ display: 'flex' }}>

                            &emsp;&emsp;&emsp;

                            <Popconfirm placement="top" title="Bạn có chắc là muốn xóa ?" onConfirm={e => confirm(item.id)} okText="Yes" cancelText="No">
                                <Button variant="contained" style={{ height: '26px' }} >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Popconfirm>


                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ThongKePhanHoi