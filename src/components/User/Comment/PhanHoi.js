import React, { useEffect, useState, useForm } from 'react'
import { Button, Form, Input, InputNumber, Spin, Card, Modal, Upload, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import "./PhanHoi.scss"
import moment from 'moment'
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


function PhanHoi(props) {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);


    const onFinish = (values) => {
        setLoading(true)
        let hienTai = new Date();
        if (hienTai - moment(props.ngayTra) > 1) {
            message.warning("Chỉ có thể đánh giá trong ngày, Đã quá hạn đánh giá")
        }
        else {
            axios
                .post("/danhGia", {
                    maPhong: props.idPhong,
                    noiDung: values.phanHoi,
                    ngayDanhGia: moment().format('YYYY-MM-DD'),
                    chatLuong: values.chatLuong

                })
                .then(res => {
                    setLoading(false)
                    if (res.data === "phan hoi thanh cong")
                        message.success("Phản hồi thành công")
                    else if (res.data === "Ban da danh gia roi") {
                        message.warning("Bạn đã đánh giá rồi")
                    } else
                        message.error("Phản hồi thất bại, có lỗi xảy ra")
            
                })
                .catch(err => {
                    console.log(err)
                })
        }

    };


    useEffect(() => {
        form.setFieldsValue({
            tenKhachSan: props.tenKhachSan,
            id: props.idPhong,
            maPhong: props.maPhong
        });

    }, [])
    return (
        <div className='phanHoi-container'>
            <h2>Hãy để lại ý kiến của bạn</h2>
            <br></br>
            <Form
                form={form}

                {...layout} name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}

            >
                <div className='phanHoi-layout'>


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
                            <Input style={{ width: '200px' }} disabled />
                        </Form.Item>

                        <Form.Item
                            name='id'
                            label="id"
                            hidden
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input style={{ width: '200px' }} disabled />
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
                            <Input style={{ width: '200px' }} disabled />
                        </Form.Item>


                        <Form.Item

                            name="chatLuong"
                            label="Điểm số"
                            rules={[
                                {

                                    type: 'number',
                                    min: 1,
                                    max: 10
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '200px' }} required />
                        </Form.Item>

                        <Form.Item name='phanHoi' label="Phản hồi">
                            <Input.TextArea required />
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

export default PhanHoi