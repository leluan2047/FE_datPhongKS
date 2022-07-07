import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Spin, Input, Space, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';
import { axios } from '../../../axios';


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
function BookRequest() {

    const [danhSachYeuCau, setDanhSachYeuCau] = useState();

    const getData = () => {
        axios
            .get("/datPhong/request")
            .then(res => {
                setDanhSachYeuCau(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }


    const pheDuyet = (id) => {
        axios
            .get(`/datPhong/agree/${id}`)
            .then(res => {
                if (res.data === "chinh sua dong y dat phong thanh cong")
                    message.success("Đồng ý thành công");
                else
                    message.error("Phê duyệt thất bại")
                getData();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const tuChoi = (id) => {
        axios
            .get(`/datPhong/deny/${id}`)
            .then(res => {
                if (res.data === "chinh sua tu choi dat phong thanh cong")
                    message.success("Từ chối yêu cầu thành công")
                else
                    message.error("Từ chối thất bại")
                getData();
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getData();
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
            fixed: 'left',
            ...getColumnSearchProps('tenKhachSan'),
            width: '30%',
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            width: '10%',
            ...getColumnSearchProps('maPhong'),
        },
        {
            title: 'Người đặt',
            dataIndex: 'hoTen',
            ...getColumnSearchProps('hoTen'),
            filterSearch: true,
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            ...getColumnSearchProps('soDienThoai'),
            filterSearch: true,
            width: '20%',
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
            title: 'Tổng tiền (VND)',
            dataIndex: 'tongTien',

            sorter: (a, b) => a.chatLuong - b.chatLuong,
            filterSearch: true,
            width: '15%',
            fixed: 'right',
        },

        {
            title: 'Đồng ý/ Từ chối',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (record) =>
                <div style={{ display: 'flex' }}>

                    <Button variant="contained" color="success" onClick={e => pheDuyet(record.id)} >
                        <i class="fa-solid fa-check"></i>
                    </Button>
                    <Button variant="outlined" color="error" onClick={e => tuChoi(record.id)} >
                        <i class="fa-solid fa-x"></i>
                    </Button>

                </div>

        },

    ];
    return (
        <div className='hotelList-container'>
            <h2>Danh sách yêu cầu</h2>

            <br></br>
            <br></br>
            <Table
                style={{ width: '75%' }}
                columns={columns}
                dataSource={danhSachYeuCau}
                scroll={{
                    x: 1300,
                }}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
                onChange={onChange} />
        </div>
    )
}

export default BookRequest