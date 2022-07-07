import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Spin,Input, Space,Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';

import Popup from "../../Popup";
import AddHotel from './AddHotel';
import EditHotel from './EditHotel';
import { axios } from "../../../axios";




const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

function HotelList() {
    const [danhSachKS, setDanhSachKS] = useState([]);
    const [filter, setFilter] = useState([])
    
    const getData = () => {
        axios
            .get('/hotelManager/Myhotel')
            .then(res => {
                setDanhSachKS(res.data)

                //------------------------------------
                var d = []
                res.data.map(item => {
                    const temp = {
                        key: item.id,
                        text: item.tenKhachSan,
                        value: item.tenKhachSan
                    }
                    d.push(temp)
                })
                setFilter(d);
                //---------------------------------------
            })
            .catch(err => {
                console.log(err)
            })
    }

    const confirm = (id) => {
        deleteData(id)
     };

    const deleteData = (id) => {
        axios
            .get(`/hotelManager/destroy/${id}`)
            .then(res => {
                if (res.data == "Xoa thanh cong")
                    message.success("Xóa thành công")
                else message.error("Không thể xóa")
                getData();
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
        console.log("HotelList render")
    }, [])

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
            title: 'Tên khách sạn',
            dataIndex: 'tenKhachSan',
            
            filterMode: 'tree',
            filterSearch: true,
           
            ...getColumnSearchProps('tenKhachSan'),
            width: '30%',
        },
        {
            title: 'Diện tích (m2)',
            dataIndex: 'dienTich',
            width: '15%',
            sorter: (a, b) => a.dienTich - b.dienTich,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            ...getColumnSearchProps('diaChi'),
            filterSearch: true,
            width: '25%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
          
            ...getColumnSearchProps('soDienThoai'),
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Chất lượng',
            dataIndex: 'chatLuong',

            sorter: (a, b) => a.chatLuong - b.chatLuong,
            filterSearch: true,
            width: '15%',
        },

        {
            title: 'Action',
            key: 'operation',

            width: 100,
            render: (record) =>
                <div style={{ display: 'flex' }}>

                    <Popup title="Sửa thông tin khách sạn" buttonName={<i className='fas fa-pencil-alt' ></i>} handleReload={getData}>
                        <EditHotel id={record.id}></EditHotel>
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
            {/* <Button variant="contained"> + Thêm khách sạn</Button> */}
            <Popup buttonName="+ Thêm khách sạn" handleReload={getData} title="Thêm khách sạn">
                <AddHotel />
            </Popup>
            <br></br>
            <br></br>
            <Table columns={columns} dataSource={danhSachKS} onChange={onChange} 
             pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
            />
        </div>
    )
}

export default HotelList