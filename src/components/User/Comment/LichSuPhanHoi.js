import React, { useEffect, useState, useForm } from 'react'
import { Table, message, Spin, Input, Space, Popconfirm } from 'antd';
import { axios } from "../../../axios"
import Popup from '../../Popup';
import Button from '@mui/material/Button';
import BinhLuan from './BinhLuan';
import "./LichSuPhanHoi.scss"
import EditPhanHoi from './EditPhanHoi';

function LichSuPhanHoi() {

    const [danhSach, setDanhSach] = useState([]);


    const getData = () => {
        axios
            .get('/danhGia/myHistory')
            .then(res => {

                setDanhSach(res.data.reverse())
            })
            .catch(err => {
                console.log(err)
            })
    }


    const deleteData = (id) => {
        axios
            .get(`/danhGia/destroy/${id}`)
            .then(res=>{
                
                if(res.data === "Xoa thanh cong")
                    message.success("Xóa bình luận thành công")
                else
                    message.error("Xóa bình luận thất bại")
                getData()
            })
            .catch(err=>{
                console.log(err)
            })
        
    }

    const confirm = (id) => {
        
        deleteData(id)
    };


    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='lichSu-container'>
            <h1>Lịch sử phản hồi </h1>
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
                            <Popup buttonName={<i className='fas fa-pencil-alt'></i>} handleReload={getData} >
                                <EditPhanHoi

                                    id={item.id}
                                    noiDung={item.noiDung}
                                    tenKhachSan={item.tenKhachSan}
                                    maPhong={item.maPhong}
                                >
                                </EditPhanHoi>
                            </Popup>
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

export default LichSuPhanHoi