import { Button, Form, Input, Spin, message, Modal, Upload, Table, Select } from 'antd';
import { React, useEffect, useState } from 'react'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { axios } from "../../../axios";
import "./EditService.scss"

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


function EditService(props) {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState();
    const [danhSachKS, setDanhSachKS] = useState([]);
    const [maKS, setMaKS] = useState();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm()

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
            .get(`hotelManager/service/show/${props.id}`)
            .then(res => {
               
                var x = res.data.hinhAnh!=null?Object.values(JSON.parse(res.data.hinhAnh)):"https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
                setimg(x);
                setMaKS(res.data.maKS);
                form.setFieldsValue({
                    maKS: res.data.maKS,
                    tenDichVu: res.data.tenDichVu,
                    moTa:res.data.moTa,

                });
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
        setSelectedFile(e.target.files[0]);
    }


    const onFinish = (values) => {
        if (maKS == null)
            window.alert("Bạn chưa chọn khách sạn")
        else {
            setLoading(true)
            var formData = new FormData();
            if (selectedFile != null)
                formData.append("hinhAnh", selectedFile)
            formData.append("maKS", maKS)
            formData.append("tenDichVu", values.tenDichVu)
            formData.append("moTa", values.moTa)


            axios
                .post(`/hotelManager/service/update/${props.id}`, formData)
                .then(res => {
                    setLoading(false)
                    if (res.data.message === "chinh sua thanh cong")
                        window.alert("Chỉnh sửa thành công")
                    else
                        window.alert("Chỉnh sửa dịch vụ thất bại")

                    if (res.data === "The hinh anh must be an image.") {
                        window.alert("Hình ảnh không đúng định dạng")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };

    return (
        <div className='editService-container'>
            <Form {...layout} name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
            >
                <div className='editService-layout'>

                    <div className='left'>
                        <h2>Ảnh dịch vụ</h2>
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
                            name='maKS'
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
                            name="tenDichVu"
                            label="Tên dịch vụ"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <Input></Input>
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
        </div>
    )
}

export default EditService