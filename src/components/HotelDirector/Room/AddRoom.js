import { React, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Spin, message, Modal, Upload, Table, Select } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { axios } from "../../../axios";
import "./AddRoom.scss";

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: 'Cần nhập thông tin ô ${label}!',
    types: {
        email: '${label} không phải là  email!',
        number: '${label} không phải là số!',
    },
    number: {
        range: '${label} phải nằm giữa ${min} và ${max}',
    },
};


function AddRoom() {
    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [danhSachKS, setDanhSachKS] = useState([]);
    const [maKS, setMaKS] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        axios
            .get('/hotelManager/Myhotel')
            .then(res => {
                setDanhSachKS(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setimg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])



        if (e.target.files) {

            setSelectedFile([])


            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setSelectedFile((prevImages) => prevImages.concat(fileArray))
            Array.from(e.target.files).map(
                file => URL.revokeObjectURL(file)
            )

        }

        setSelectedImage(e.target.files);
    }


    const onFinish = (values) => {
        setLoading(true)
        var formData = new FormData();
        if (selectedImage != null) {

            for (let i = 0; i < selectedImage.length; i++) {
                formData.append(`hinhAnh[${i}]`, selectedImage[i])
            }
        }
        formData.append("maKS", values.maKS)
        formData.append("dienTich", values.dienTich)
        formData.append("soGiuong", values.soGiuong)
        formData.append("donGia", values.donGia)
        formData.append("trangThai", values.trangThai)
        formData.append("moTa", values.moTa)
        formData.append("maPhong", values.maPhong)


        axios
            .post("/hotelManager/room/add", formData)
            .then(res => {
                setLoading(false);
                if (res.data === "tao phong thanh cong")
                    window.alert("Tạo phòng thành công")
                else
                    window.alert("Tạo phòng thất bại")

                if (res.data === "The hinhAnh.0 must be an image.") {
                    window.alert("Hình ảnh không đúng định dạng")
                }
            })
            .catch(err => {
                console.log(err)
            })

    };



    return (
        <div className='addRoom-container'>
            <Form {...layout} name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                initialValues={{
                    ["tenKhachSan"]: "sad",
                }}
            >
                <div className='addRoom-layout'>

                    <div className='left'>
                        <h2>Ảnh phòng</h2>
                        <div className='hotel-img' >
                            <div className='img'>
                                <img src={img}></img>
                            </div>
                            <hr></hr>
                            <label htmlFor="formId">
                                <input type='file' hidden accept='image/*' multiple onChange={(e) => imageHandler(e)} id="formId" ></input>
                                <div className='upload-button'>
                                    <UploadOutlined /> &nbsp; Upload
                                </div>
                            </label>

                        </div>
                    </div>

                    <div className='right'>

                        <Form.Item
                            name="maKS"
                            label="Tên khách sạn"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                size='middle'

                                dropdownStyle={{ zIndex: 2000 }}
                                style={{
                                    width: 200,
                                }}
                                onChange={value => setMaKS(value)}

                            >
                                {danhSachKS.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.tenKhachSan}</Option>
                                    )
                                })}

                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="maPhong"
                            label="Mã phòng"
                            rules={[
                                {
                                    required: true,

                                },
                            ]}
                        >
                            <Input style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name="dienTich"
                            label="Diện tích (m2)"
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name="soGiuong"
                            label="Số giường"
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    min: 0,
                                    max: 10,
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name="donGia"
                            label="Đơn giá"
                            rules={[
                                {
                                    required: true,
                                    type: 'number',

                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name="trangThai"
                            label="Trạng thái"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                size='middle'
                                dropdownStyle={{ zIndex: 2000 }}

                                style={{
                                    width: 200,
                                }}
                            >
                                <Option value="phongTrong">Phòng trống</Option>
                                <Option value="dangThue">Đang thuê</Option>
                                <Option value="chuanBi">Chuẩn bị</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name='moTa' label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            &nbsp;&nbsp; &nbsp;&nbsp;

                            <Spin spinning={loading} indicator={<LoadingOutlined
                                style={{
                                    fontSize: 24,
                                }}
                                spin
                            />} />
                        </Form.Item>

                    </div>
                </div>
            </Form>
            <br></br>
            <br></br>
            {selectedFile ?
                <Box sx={{ width: 650, height: 450, overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {selectedFile.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    src={item}
                                    srcSet={item}

                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
                :
                ""}
        </div>
    )
}

export default AddRoom