import { React, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Select, message, Spin } from 'antd';
import "./Register.scss";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { axios } from '../../axios';
const { Option } = Select;

function Register() {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState();
    const [loading, setLoading] = useState(false);

    const imageHandler = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setimg(reader.result)
                console.log(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
        setSelectedFile(e.target.files[0]);
    }


    const onFinish = (values) => {

        if (values.password != values.password_confirmation) {
            message.warning('Xác nhận mật khẩu sai');
        }
        else {
            setLoading(true)
            var formData = new FormData();
            if (selectedFile != null)
                formData.append("anhDaiDien", selectedFile)
            formData.append("email", values.email)
            formData.append("password", values.password)
            formData.append("password_confirmation", values.password_confirmation);
            formData.append("hoTen", values.hoTen);
            formData.append("diaChi", values.diaChi);
            formData.append("soDienThoai", values.soDienThoai);
            formData.append("vaiTro", values.vaiTro);

            axios
                .post("/register", formData)
                .then(res => {
                    setLoading(false)
                    if (res.data === "The email has already been taken.")
                        message.error("Email đã tồn tại, vui lòng đăng ký bằng email khác")
                    if (res.data.message === "dang ky thanh cong")
                        message.success("Đăng ký thành công")
                    else
                        message.error("Đăng ký thất bại")

                    if (res.data === "The anh dai dien must be an image.") {
                        message.error("Hình ảnh không đúng định dạng")
                    }
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }


    };


    return (
        <div className='register-container'>
            <div className='register-all'>
               
                <Form className='form-register'
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}

                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{ width: "200px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{ width: "200px" }} />
                    </Form.Item>

                    <Form.Item label="Họ tên"
                        name="hoTen"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần điền dữ liệu vào ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Địa chỉ" name="diaChi"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần điền dữ liệu vào ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="soDienThoai"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần điền dữ liệu vào ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Vai trò" name="vaiTro"
                        rules={[
                            {
                                required: true,

                            },
                        ]}
                    >
                        <Select style={{ width: '200px' }}
                            dropdownStyle={{ zIndex: 2000 }}
                        >
                            <Option value="hotelManager">Quản lý khách sạn</Option>
                            <Option value="user">Người dùng</Option>
                        </Select>
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                        &nbsp;&nbsp; &nbsp;&nbsp;

                        <Spin spinning={loading} indicator={<LoadingOutlined
                            style={{
                                fontSize: 24,
                            }}
                            spin
                        />} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register