import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Spin, Input, Space, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';

import Popup from '../../Popup';
import EditRoom from "./EditRoom"
import AddRoom from './AddRoom';
import { axios } from "../../../axios";

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
function RoomList() {

    const [danhSachPhong, setDanhSachPhong] = useState([]);

    const confirm = (id) => {
        deleteData(id)
    };

    const deleteData = (id) => {
        axios
            .get(`/hotelManager/room/destroy/${id}`)
            .then(res => {
                res.data === "Xoa thanh cong" ? message.success("Xóa phòng thành công") : message.error("Không thể xóa phòng")
                getData();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getData = () => {
        axios
            .get('/hotelManager/myRoom')
            .then(res => {
                setDanhSachPhong(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData();
        console.log("RoomList render")
    }, [])

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
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
            title: 'Tên Khách Sạn',
            dataIndex: 'tenKhachSan',

            filterSearch: true,
            ...getColumnSearchProps('tenKhachSan'),
            width: '25%',
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            ...getColumnSearchProps('maPhong'),
            width: '10%',
        },
        {
            title: 'Diện tích',
            dataIndex: 'dienTich',
            sorter: (a, b) => a.dienTich - b.dienTich,
            width: '15%',
        },
        {
            title: 'Số giường',
            dataIndex: 'soGiuong',
            sorter: (a, b) => a.soGiuong - b.soGiuong,
            width: '15%',
        },
        {
            title: 'Đơn giá (VND)',
            dataIndex: 'donGia',
            sorter: (a, b) => a.donGia - b.donGia,
            width: '15%',
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'trangThai',
        //     ...getColumnSearchProps('trangThai'),
        //     width: '20%',
        // },
        {
            title: 'Action',
            key: 'operation',

            width: 100,
            render: (record) =>
                <div style={{ display: 'flex' }}>

                    <Popup title="Chỉnh sửa thông tin phòng" buttonName={<i className='fas fa-pencil-alt' ></i>} handleReload={getData}>
                        <EditRoom id={record.id}></EditRoom>
                    </Popup>

                    &nbsp;&nbsp;&nbsp;

                    <Popconfirm placement="top" title="Bạn có chắc là muốn xóa ?" onConfirm={e => confirm(record.id)} okText="Yes" cancelText="No">
                        <Button variant="contained"  >
                            <i className='fas fa-trash'></i>
                        </Button>
                    </Popconfirm>

                </div>
        },
    ];
    return (
        <div className='hotelList-container'>
            <Popup buttonName="+ Thêm phòng" handleReload={getData} title="Thêm phòng">
                <AddRoom></AddRoom>
            </Popup>
            <br></br>
            <br></br>
            <Table columns={columns} dataSource={danhSachPhong} onChange={onChange}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
            />
        </div>
    )
}

export default RoomList