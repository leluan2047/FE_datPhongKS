import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useState, React } from 'react';

function AdminInfo() {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <div className='AdminInfo'>
            <div className='avatar'>
                <div>
                    <img src='#'></img>
                </div>
                <div>
                    button thay doi anh
                </div>
            </div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >

                <Form.Item label="Email" >
                    <Input />
                </Form.Item>
                <Form.Item label="Password" >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Họ và tên" >
                    <Input />
                </Form.Item>
                <Form.Item label="Địa chỉ" >
                    <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại" >
                    <Input />
                </Form.Item>
                <Form.Item label="Vai trò" >
                    <Input />
                </Form.Item>
                <Form.Item label="Trạng thái" >
                    <Input />
                </Form.Item>


                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AdminInfo