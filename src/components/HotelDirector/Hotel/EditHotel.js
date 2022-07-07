import React, { useEffect, useState, useForm } from 'react'
import { Button, Form, Input, InputNumber, Spin, Card, Modal, Upload, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { axios } from "../../../axios"
import "./EditHotel.scss"


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const columns = [
    {
        title: 'Tên dịch vụ',
        dataIndex: 'tenDichVu',
        key: 'name',
    },
    {
        title: 'hình Ảnh',
        dataIndex: 'age',
        key: 'age',
    },

    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,

        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,

        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,

        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,

        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];

function EditHotel(props) {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    
    const [selectedFile, setSelectedFile] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    
    const [tenKhachSan, setTenKhachSan] = useState("");
    const [dienTich, setDienTich] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [hinhAnh, setHinhAnh] = useState({});
    const [moTa, setMoTa] = useState("");
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);

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


    const getData = () => {
        axios
            .get(`/hotelManager/show/${props.id}`)
            .then(res => {

                setTenKhachSan(res.data.tenKhachSan)
                setDienTich(res.data.dienTich)
                setDiaChi(res.data.diaChi)
                setSoDienThoai(res.data.soDienThoai)
                setMoTa(res.data.moTa);
                
                setimg(res.data[0].hinhAnh!=null?Object.values(JSON.parse(res.data[0].hinhAnh))[0]:"https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
                setSelectedFile(res.data[0].hinhAnh!=null?Object.values(JSON.parse(res.data[0].hinhAnh)):[]);

                form.setFieldsValue({
                    tenKhachSan: res.data[0].tenKhachSan,
                    dienTich: parseInt(res.data[0].dienTich),
                    diaChi: res.data[0].diaChi,
                    soDienThoai: res.data[0].soDienThoai,
                    moTa: res.data[0].moTa
                });
                // console.log(Object.values(JSON.parse(res.data[0].hinhAnh)))
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData();

    }, [])

    
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

        formData.append("moTa", values.moTa);


        axios
            .post(`/hotelManager/update/${props.id}`, formData)
            .then(res => {
                setLoading(false)
                if (res.data.message === "chinh sua thanh cong")
                    window.alert("Chỉnh sửa khách sạn thành công")
                else
                    window.alert("Chỉnh sửa khách sạn thất bại")

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
            <Form
                form={form}

                {...layout} name="nest-messages"
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

                            name='tenKhachSan'
                            label="Tên khách sạn"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item

                            name="dienTich"
                            label="Diện tích (m2)"
                            rules={[
                                {
                                    type: 'number',

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


                        <Form.Item name='moTa' label="Mô tả">
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
        </div >
    )
}

export default EditHotel