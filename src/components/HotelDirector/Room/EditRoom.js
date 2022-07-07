import { React, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Spin, message, Modal, Upload, Table, Select } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { axios } from "../../../axios"
import "./EditRoom.scss"

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
        title: 'Tên',
        dataIndex: 'tenDichVu',
        key: 'name',
    },

    {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'age',
    },

    {
        title: 'Hình Ảnh',
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

function EditRoom(props) {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [danhSachKS, setDanhSachKS] = useState([]);

    const [selectedFile, setSelectedFile] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);

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
            .get('/hotelManager/Myhotel')
            .then(res => {
                setDanhSachKS(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios
            .get(`/hotelManager/room/show/${props.id}`)
            .then(res => {


                setimg(res.data[0].hinhAnh!=null?Object.values(JSON.parse(res.data[0].hinhAnh))[0]:"https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
                setSelectedFile(res.data[0].hinhAnh!=null?Object.values(JSON.parse(res.data[0].hinhAnh)):[]);

                form.setFieldsValue({
                    maKS: res.data[0].maKS,
                    maPhong: res.data[0].maPhong,
                    dienTich: parseInt(res.data[0].dienTich),
                    soGiuong: res.data[0].soGiuong,
                    donGia: res.data[0].donGia,
                    trangThai: res.data[0].trangThai,
                    moTa: res.data[0].moTa
                });
            })
            .catch(err => {

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
        formData.append("maKS", values.maKS)
        formData.append("maPhong", values.maPhong)
        formData.append("dienTich", values.dienTich);
        formData.append("soGiuong", values.soGiuong);
        formData.append("donGia", values.donGia);
        formData.append("trangThai", values.trangThai);


        axios
            .post(`/hotelManager/room/update/${props.id}`, formData)
            .then(res => {
                setLoading(false)
                if (res.data.message === "chinh sua thanh cong")
                    window.alert("Chỉnh sửa phòng thành công")
                else
                    window.alert("Chỉnh sửa phòng thất bại")

                if (res.data === "The hinhAnh.0 must be an image.") {
                    window.alert("Hình ảnh không đúng định dạng")
                }
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    };
    return (
        <div className='addHotel-container'>

            <Form {...layout} name="nest-messages"
                form={form}
                onFinish={onFinish}
                validateMessages={validateMessages}

            >
                <div className='addHotel-layout'>

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


                            >
                                {danhSachKS.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.tenKhachSan}</Option>
                                    )
                                })}

                            </Select>
                        </Form.Item>


                        <Form.Item
                            name='maPhong'
                            label="Mã phòng"
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
                                    type: 'number',
                                    min: 0,
                                    max: 99,
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
                                    type: 'number',
                                    min: 0,

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
            {/* <div className='dichVu-container'>
                <br></br><br></br>
                <h1>Một số nội thất, thiết bị có sẵn trong phòng</h1>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                {record.description}
                            </p>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                    dataSource={data}
                />
            </div> */}
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

export default EditRoom;