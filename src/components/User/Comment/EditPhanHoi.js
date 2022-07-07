import React, { useEffect, useState, useForm } from 'react'
import { Button, Form, Input, InputNumber, Spin, Card, Modal, Upload, Table, message,Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
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

function EditPhanHoi(props) {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true)
        axios
            .post(`/danhGia/sua/${props.id}`, {
                noiDung: values.phanHoi
            })
            .then(res => {
                setLoading(false)
                if (res.data === "sua danh gia thanh cong")
                    message.success("Sửa đánh giá thành công")
                else
                    message.error("Sửa đánh giá thất bại")
            })
            .catch(err => {
                console.log(err)
            })

    };


    useEffect(() => {
        form.setFieldsValue({
            tenKhachSan: props.tenKhachSan,
            id: props.idPhong,
            maPhong: props.maPhong,
            phanHoi: props.noiDung
        });

    }, [])

    return (
        <div className='dell'>
            <h2>Chỉnh sửa phản hồi</h2>
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

export default EditPhanHoi