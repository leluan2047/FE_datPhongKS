import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    message
} from 'antd';
import 'antd/dist/antd.css';
import moment from "moment"
import { axios } from '../../../axios';


const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i++) {
        result.push(i);
    }

    return result;
};

const { RangePicker } = DatePicker;
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Vui lòng nhập thông tin',
        },
    ],
};


const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
};

const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
});

const disabledRangeTime = (_, type) => {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

}





function Book(props) {

    const [tongTien, setTongTien] = useState();
    const [ngayNhan, setNgayNhan] = useState();
    const [ngayTra, setNgayTra] = useState();

    const onChange = (dates, dateStrings) => {
        if (dates) {

            let thanhTien = (((dates[1] - dates[0]) / 3600000) * (props.donGia / 24)).toFixed(0)
            setTongTien((thanhTien/1000).toFixed(0)*1000)

            //   console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);


            setNgayNhan(dateStrings[0])
            setNgayTra(dateStrings[1])
            console.log(props.id)
        } else {
            console.log('Clear');
        }
    };


    const onFinish = (values) => {
        axios
            .post('/datPhong', {
                maPhong: props.id,
                ngayNhan: moment(new Date(ngayNhan)).format('YYYY-MM-DDTHH:mm:ss'),
                ngayTra: moment(new Date(ngayTra)).format('YYYY-MM-DDTHH:mm:ss'),
                tongTien: tongTien
            })
            .then(res => {
                if(res.data === "Khong the dat phong vi trung lich")
                    window.alert("Không thể đặt phòng vì trùng lịch, vui lòng chọn ngày khác")
                if(res.data === "Dat phong thanh cong")
                    window.alert("Đặt phòng thành công, yêu cầu của bạn được gửi đến quản lý duyệt")
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })


    };

    return (
        <div style={{ width: "400px" }} >
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                onFinish={onFinish}
                style={{ width: '330px' }}
            >




                <label>Ngày nhận - trả</label>
                <Form.Item name="ngay" {...rangeConfig} >

                    <RangePicker
                        style={{ width: '350px' }}
                        disabledDate={disabledDate}

                        ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        onChange={onChange}
                    />

                    {/* <RangePicker
                        style={{ width: '350px' }}
                        disabledDate={disabledDate}
                        disabledTime={disabledRangeTime}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                    /> */}
                </Form.Item>

                <label>Đơn giá: {props.donGia} VND/ngày</label>
                <Form.Item   >

                </Form.Item>

                <label>Thành tiền:</label>
                <Form.Item   >
                    <InputNumber
                        style={{ width: '250px' }}
                        disabled
                        value={tongTien}
                        formatter={(tongTien) => `VND ${tongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(tongTien) => tongTien.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">Đặt phòng</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Book