import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Spin,Input, Space,Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';


import { axios } from '../../../axios';




function RegisterRequest() {

    const [danhSachXetDuyet, setDanhSachXetDuyet] = useState([])

    const getData = () => {
        axios
            .get("/admin/xetDuyet")
            .then(res => {
                setDanhSachXetDuyet(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const pheDuyet = (id) => {
        axios
            .get(`/admin/xetDuyet/ok/${id}`)
            .then(res => {
                if (res.data === "thanh cong")
                    message.success("Duyệt thành công")
                else
                    message.warning("Thao tác thất bại")
                getData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const tuChoi = (id) => {
        axios
            .get(`/admin/xetDuyet/no/${id}`)
            .then(res => {
                if (res.data === "thanh cong")
                    message.success("Đã từ chối")
                else
                    message.warning("Thao tác thất bại")
                getData()
            })
            .catch(err => {
                console.log(err)
            })
    }
   //filter thu vien antd
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Email',
            width: "15%",
            dataIndex: 'email',
            key: 'name',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Họ tên',
            width: "15%",
            dataIndex: 'hoTen',
            key: 'age',
            ...getColumnSearchProps('hoTen'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            width: "15%",
            key: '1',
            ...getColumnSearchProps('diaChi'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            width: "15%",
            key: '2',
            ...getColumnSearchProps('soDienThoai'),
        },

        {
            title: 'Đồng ý/ Từ chối',
            key: 'operation',

            width: "10%",
            render: (record) =>
                <div style={{ display: 'flex' }}>

                    <Button variant="contained" onClick={e => pheDuyet(record.id)} >
                        <i class="fa-solid fa-circle-check"></i>
                    </Button>

                    &nbsp;&nbsp;&nbsp;
                    <Button variant="contained" style={{ background: 'red' }} onClick={e => tuChoi(record.id)} >
                        <i class="fa-solid fa-xmark"></i>
                    </Button>

                </div>

        },
    ];
    return (
        <div>
            <h1>Yêu cầu đăng ký tài khoản</h1>
            <Table
                columns={columns}
                dataSource={danhSachXetDuyet}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
            />
        </div>
    )
}

export default RegisterRequest