import React, { useEffect, useState, useForm } from 'react'
import { Button, Form, Input, InputNumber, Spin, Card, Modal, Upload, Table, Select, message } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { axios } from "../../axios"
import "./AdminInfo.scss"

const { Option } = Select;


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


function AdminInfo(props) {
    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState();

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
        setSelectedFile(e.target.files[0]);
    }

    const getData = () => {
        axios
            .get(`/account/show/${props.id}`)
            .then(res => {
                console.log(res);
                setimg(res.data.anhDaiDien != null ? Object.values(JSON.parse(res.data.anhDaiDien)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
                localStorage.setItem("hinhAnh", res.data.anhDaiDien != null ? Object.values(JSON.parse(res.data.anhDaiDien)) : "https://cdn3.iconfinder.com/data/icons/login-5/512/LOGIN_6-512.png");
                form.setFieldsValue({
                    email: res.data.email,
                    hoTen: res.data.hoTen,
                    diaChi: res.data.diaChi,
                    soDienThoai: res.data.soDienThoai,
                    vaiTro: res.data.vaiTro,
                    password: localStorage.getItem("password"),
                    password_confirmation: localStorage.getItem("password"),
                    endpoint: res.data.endpoint,
                    accessKey: res.data.accessKey,
                    partnerCode: res.data.partnerCode,
                    secretKey: res.data.secretKey
                });

            })
            .catch(err => {
                console.log(err)
            })
    }

    const onFinish = (values) => {

        if (values.password == null || values.password == values.password_confirmation) {

            setLoading(true)
            var formData = new FormData();
            if (selectedFile != null)
                formData.append("anhDaiDien", selectedFile)

            if (values.password != null) {
                formData.append("password", values.password)
                formData.append("password_confirmation", values.password_confirmation);
            }
            if (values.password == "") {
                formData.delete("password")
                formData.delete("password_confirmation")
            }
            formData.append("hoTen", values.hoTen);
            formData.append("diaChi", values.diaChi);
            formData.append("soDienThoai", values.soDienThoai);
            
            if (values.endpoint && values.partnerCode && values.accessKey && values.secretKey) {
                formData.append("endpoint", values.endpoint)
                formData.append("partnerCode", values.partnerCode)
                formData.append("accessKey", values.accessKey)
                formData.append("secretKey", values.secretKey)
            }

            axios
                .post(`/account/update/${localStorage.getItem('id')}`, formData)
                .then(res => {
                    setLoading(false)
                    console.log(res.data)
                    if (res.data.message === "chinh sua thanh cong")
                        message.success("Ch???nh s???a th??nh c??ng")
                    else
                        message.error("Ch???nh s???a th???t b???i")

                    if (res.data === "The anh dai dien must be an image.") {
                        message.error("H??nh ???nh kh??ng ????ng ?????nh d???ng")
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }

        else {
            message.warning('X??c nh???n m???t kh???u sai');
        }
    };

    useEffect(() => {
        getData();

    }, [])
    return (
        <div className='AdminInfo-container'>

            <div className='AdminInfo-layout'>

                <div className='left'>
                    <h2>???nh ?????i di???n</h2>
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

                    <Form
                        form={form}
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
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="M???t kh???u"
                            name="password"
                            rules={[
                                {

                                },
                            ]}
                        >
                            <Input.Password style={{ width: "200px" }} />
                        </Form.Item>
                        <Form.Item
                            label="X??c nh???n m???t kh???u"
                            name="password_confirmation"
                            rules={[
                                {

                                },
                            ]}
                        >
                            <Input.Password style={{ width: "200px" }} />
                        </Form.Item>

                        <Form.Item label="H??? t??n"
                            name="hoTen"
                            rules={[
                                {
                                    required: true,
                                    message: 'B???n c???n ??i???n d??? li???u v??o ?? n??y',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="?????a ch???" name="diaChi"
                            rules={[
                                {
                                    required: true,
                                    message: 'B???n c???n ??i???n d??? li???u v??o ?? n??y',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="S??? ??i???n tho???i" name="soDienThoai"
                            rules={[
                                {
                                    required: true,
                                    message: 'B???n c???n ??i???n d??? li???u v??o ?? n??y',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Vai tr??" name="vaiTro"

                        >
                            <Select style={{ width: '200px' }}
                                dropdownStyle={{ zIndex: 2000 }}
                                disabled
                            >
                                <Option value="hotelManager">Qu???n l?? kh??ch s???n</Option>
                                <Option value="user">Ng?????i d??ng</Option>
                            </Select>
                        </Form.Item>

                        {localStorage.getItem('vaiTro') == "hotelManager" ?
                            <div>
                                <h2>Th??ng tin thanh to??n online MoMo</h2>
                                <Form.Item label="endPoint" name="endpoint"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="partnerCode" name="partnerCode"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="accessKey" name="accessKey"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="secretKey" name="secretKey"

                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            :
                            ""
                        }

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                C???p nh???t
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

        </div>
    )
}

export default AdminInfo