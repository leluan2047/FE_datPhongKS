import { Button, Checkbox, Form, Input, message, Space, Spin } from 'antd';
import "./Login.scss";
import { axios } from '../../axios';
import { React, useEffect, useState } from 'react'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true)
        axios
            .post("/login", {
                email: values.email,
                password: values.password
            })
            .then(res => {

                setLoading(false)
                if (res.data.token) {
                    localStorage.setItem("password", values.password);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("hoTen", res.data.user.hoTen);
                    localStorage.setItem("id", res.data.user.id);
                    localStorage.setItem("hinhAnh", res.data.user.anhDaiDien != null ? Object.values(JSON.parse(res.data.user.anhDaiDien)) : "https://cdn3.iconfinder.com/data/icons/login-5/512/LOGIN_6-512.png");

                    localStorage.setItem("vaiTro", res.data.user.vaiTro);

                    message.success('Đăng nhập thành công');
                    navigate("/")
                };
                if (res.data.message === "ten dang nhap hoac mat khau sai")
                    message.warning('Tên đăng nhập hoặc mật khẩu sai');

                if (res.data === "Tai khoan chua duoc duyet")
                    message.warning('Tài khoản chưa được admin phê duyệt, vui lòng chờ');

                if (res.data === "Tai khoan da bi khoa")
                    window.alert("Tài khoản bị khóa, vui lòng liên hệ Admin để mở lại tài khoản")

                if (res.data === "Tu choi dang ky")
                    message.error("Tài khoản của bạn bị từ chối đăng ký")
                    
            })
            .catch(err => {
                console.log(err)
            })
    };



    return (
        <div className='login-container'>
            <div className='login-all'>

                <Form className='form-login'
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
                                message: "The input is not valid E-mail!",
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
                        <Input.Password />
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
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
    );
};

export default Login;