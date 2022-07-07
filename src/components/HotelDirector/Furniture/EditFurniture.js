import { React, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber,Spin, Card, Modal, Upload, Table, Select } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import "./EditFurniture.scss";
import { axios } from '../../../axios';

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
function EditFurniture(props) {
    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState();
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
        setSelectedFile(e.target.files[0])
    }
    const getData = () => {
        axios
            .get(`/hotelManager/furniture/show/${props.id}`)
            .then(res => {
                setimg(res.data.hinhAnh != null ? Object.values(JSON.parse(res.data.hinhAnh)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");

                form.setFieldsValue({
                    tenNoiThat: res.data.tenNoiThat,
                    soLuong: res.data.soLuong,
                    moTa: res.data.moTa,

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
        if (selectedFile != null)
            formData.append("hinhAnh", selectedFile)
        formData.append("tenNoiThat", values.tenNoiThat)
        formData.append("soLuong", values.soLuong)
        formData.append("moTa", values.moTa);



        axios
            .post(`/hotelManager/furniture/update/${props.id}`, formData)
            .then(res => {
                setLoading(false)
                if (res.data.message === "chinh sua thanh cong")
                    window.alert("Chỉnh nội thất thành công")
                else
                    window.alert("Chỉnh nội thất thất bại")

                if (res.data === "The hinh anh must be an image.") {
                    window.alert("Hình ảnh không đúng định dạng")
                }
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })


    };
    return (
        <div className='EditFurniture-container'>
            <Form {...layout} name="nest-messages"
                form={form}
                onFinish={onFinish}
                validateMessages={validateMessages}
                initialValues={{
                    ["tenKhachSan"]: "sad",
                }}
            >
                <div className='EditFurniture-layout'>

                    <div className='left'>
                        <h2>Ảnh nội thất</h2>
                        <div className='hotel-img' >
                            <div className='img'>
                                <img src={img}></img>
                            </div>
                            <hr></hr>
                            <label onChange={(e) => imageHandler(e)} htmlFor="formId">
                                <input type='file' hidden accept='image/*' onChange={(e) => imageHandler(e)} id="formId" ></input>
                                <div className='upload-button'>
                                    <UploadOutlined /> &nbsp; Upload
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='right'>


                        <Form.Item
                            name='tenNoiThat'
                            label="Tên nội thất"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input style={{ width: '200px' }} />
                        </Form.Item>


                        <Form.Item
                            name="soLuong"
                            label="Số lượng"
                            rules={[
                                {
                                    required: true,

                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} />
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
        </div>
    )
}

export default EditFurniture