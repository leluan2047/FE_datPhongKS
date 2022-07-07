import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Spin, Input, Space, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';
import { axios } from '../../../axios';
import Popup from '../../Popup';
import PhanHoi from '../Comment/PhanHoi';
import moment from "moment";
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
function BookHistory() {

    const [danhSachDatPhong, setDanhSachDatPhong] = useState();

    const getData = () => {
        axios
            .get("/datPhong/history")
            .then(res => {
                setDanhSachDatPhong(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const huyDat = (id) => {
        axios
            .get(`/datPhong/huy/${id}`)
            .then(res => {
                getData()
                if (res.data === "Xoa thanh cong")
                    message.success("Hủy đặt phòng thành công")
                else
                    message.error("Hủy thất bại")
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getData();
    }, [])

    const thanhToan = (tongTien, ngayNhan, endpoint, accessKey, partnerCode, secretKey) => {


        if (endpoint && accessKey && partnerCode && secretKey) {
            axios
                .post('/datPhong/thanhToan', {
                    tongTien: tongTien,
                    ngayNhan: ngayNhan,
                    endpoint: endpoint,
                    accessKey: accessKey,
                    partnerCode: partnerCode,
                    secretKey: secretKey
                })
                .then(res => {
                    window.open(
                        res.data.qrCodeUrl,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            message.error("Khách sạn này chưa hỗ trợ thanh toán online")
        }
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
            title: 'Tên khách sạn',
            dataIndex: 'tenKhachSan',

            filterMode: 'tree',
            filterSearch: true,
            fixed: 'left',
            ...getColumnSearchProps('tenKhachSan'),
            width: '25%',
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            width: '9%',

            ...getColumnSearchProps('maPhong'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            width: '20%',
            ...getColumnSearchProps('diaChi'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            width: '15%',
            ...getColumnSearchProps('soDienThoai'),
        },
        {
            title: 'Ngày Nhận',
            dataIndex: 'ngayNhan',
            ...getColumnSearchProps('ngayNhan'),
            filterSearch: true,
            width: '15%',
        },
        {
            title: 'Ngày trả',
            dataIndex: 'ngayTra',

            ...getColumnSearchProps('ngayTra'),
            filterSearch: true,
            width: '15%',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'tongTien',

            sorter: (a, b) => a.chatLuong - b.chatLuong,
            filterSearch: true,
            width: '15%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            fixed: 'right',
            ...getColumnSearchProps('trangThai'),
            filterSearch: true,
            width: '10%',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: '16%',
            render: (record) =>
                <div style={{ display: 'flex' }}>
                    {record.trangThai === "xetDuyet" ?
                        <Button variant="outlined" color="error" onClick={e => huyDat(record.id)} >
                            Hủy
                        </Button>
                        :
                        ""
                    }
                    {record.trangThai === "hoanTat" ?
                        (moment() - moment(record.ngayTra) < 1 ?
                            <Popup buttonName="Phản hồi">
                                <PhanHoi
                                    idPhong={record.id}
                                    tenKhachSan={record.tenKhachSan}
                                    maPhong={record.maPhong}
                                    ngayTra={record.ngayTra}
                                ></PhanHoi>
                            </Popup>
                            :
                            ""
                        )
                        :
                        ""

                    }
                    {record.trangThai === "chuaThanhToan" ?
                        <Button style={{ height: 'auto' }} variant="outlined" color="error"
                            onClick={e => thanhToan(record.tongTien, record.ngayNhan, record.endpoint,
                                record.accessKey, record.partnerCode, record.secretKey)}
                        >

                            Pay
                        </Button>
                        // <form  method="POST" onSubmit={e=>thanhToan()} target="_blank" 
                        //     >
                        //     <input type='submit' name='momo' value="Thanh toán" className='btn btn-danger'></input>
                        // </form>
                        :
                        ""
                    }
                </div>

        },

    ];
    return (
        <div className='hotelList-container'>
            <h2>Lịch sử đặt phòng</h2>

            <br></br>
            <br></br>
            <Table columns={columns} dataSource={danhSachDatPhong} onChange={onChange}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
                style={{ width: '75%' }}
                scroll={{
                    x: 1300,
                }}

            />
        </div>
    )
}

export default BookHistory