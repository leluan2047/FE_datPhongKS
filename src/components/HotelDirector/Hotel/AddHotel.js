import { React, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Spin, message, Modal, Upload, Table, Select } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import "./AddHotel.scss";
import { axios } from "../../../axios";
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
function AddHotel() {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
  
    const [selectedFile, setSelectedFile] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [danhSachKS, setDanhSachKS] = useState([]);
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
        // getData();
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
            // formData.append("hinhAnh[]", selectedFile)
        }

        formData.append("tenKhachSan", values.tenKhachSan)
        formData.append("dienTich", values.dienTich)
        formData.append("diaChi", values.diaChi);
        formData.append("soDienThoai", values.soDienThoai);
        formData.append("chatLuong", values.chatLuong);
        formData.append("moTa", values.moTa);

        axios
            .post("/hotelManager/addHotel", formData)
            .then(res => {
                console.log(res)
                setLoading(false)
                if (res.data === "tao khach san thanh cong")
                    window.alert("Tạo khách sạn thành công")
                else
                    window.alert("Tạo khách sạn thất bại")

                if (res.data === "The hinhAnh.0 must be an image.") {
                    window.alert("Hình ảnh không đúng định dạng")
                }

            })
            .catch(err => {
                console.log(err)
            })

    };
    return (
        <div className='addHotel-container'>
            <Form {...layout} name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}

            >
                <div className='addHotel-layout'>

                    <div className='left'>
                        <h2>Ảnh khách sạn</h2>
                        <div className='hotel-img' >
                            <div className='img'>
                                <img src={img}></img>
                            </div>
                            <hr></hr>
                            <label htmlFor="formId" onChange={(e) => imageHandler(e)}>
                                <input type='file' hidden accept='image/*' id="formId" multiple ></input>
                                <div className='upload-button'>
                                    <UploadOutlined /> &nbsp; Upload
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='right'>

                        <Form.Item
                            name="tenKhachSan"
                            label="Tên khách sạn"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <Input></Input>
                        </Form.Item>



                        <Form.Item
                            name="dienTich"
                            label="Diện tích (m2)"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name='diaChi'
                            label="Địa chỉ"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="soDienThoai"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name="chatLuong"
                            label="Chất lượng"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    min: 0,
                                    max: 10
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} />
                        </Form.Item>

                        <Form.Item
                            name='moTa'
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
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

export default AddHotel