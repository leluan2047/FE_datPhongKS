import React, { useEffect, useState, useRef } from 'react'
import { Table, message, Form, Spin, Input, Space, Select, Popconfirm, InputNumber, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';
import moment from "moment";
import { axios } from '../../../axios';

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const { RangePicker } = DatePicker;
const { Option } = Select;
function Statistical() {

    const [danhSachDatPhong, setDanhSachDatPhong] = useState([]);
    const [danhSachDatPhong2, setDanhSachDatPhong2] = useState([]);

    const [danhSachKhachSan, setDanhSachKhachSan] = useState([]);

    const [tongTien, setTongTien] = useState();
    const [tongTien2, setTongTien2] = useState();

    const [tenKhachSan, setTenKhachSan] = useState();
    const [khungThoiGian, setKhungThoiGian] = useState();

    const getData = () => {
        axios
            .get("/datPhong/historyOfHotelDir")
            .then(res => {
                console.log(res)

                setTongTien(layDoanhThu(res.data));
                setTongTien2(layDoanhThu(res.data));
                setDanhSachDatPhong(res.data)
                setDanhSachDatPhong2(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios
            .get("/hotelManager/Myhotel")
            .then(res => {
                console.log(res);
                setDanhSachKhachSan(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const layDoanhThu = (a) => {
        var x = 0;
        a.map(item => {
            x = x + item.tongTien
        })
        return x;
    }


    useEffect(() => {
        getData();
    }, [])

    const luuTenKhachSan = (value) => {

        if (value) {
            // setTenKhachSan(value)
            let a = danhSachDatPhong2.filter(e => {
                return e.tenKhachSan === value;
            })
            setDanhSachDatPhong(a);
            setTongTien(layDoanhThu(a))
        }
        else {
            setDanhSachDatPhong(danhSachDatPhong2)
            setTongTien(layDoanhThu(danhSachDatPhong2))
        }

    }

    const chonMocThoiGian = (value) => {
        if (value) {
            let hienTai = new Date();
            let a = danhSachDatPhong2.filter(item => {
                return moment(item.ngayTra) > value[0] && moment(item.ngayTra) < value[1]
            })
            setDanhSachDatPhong(a);
            setTongTien(layDoanhThu(a))


            // switch (value) {
            //     case "1tuan":

            //         a = danhSachDatPhong.filter(item => {

            //             return (hienTai - moment(item.ngayTra)) < 604800*1000;
            //         })
            //         setDanhSachDatPhong(a);
            //         setTongTien(layDoanhThu(a))

            //         break;
            //     case "1thang":

            //         a = danhSachDatPhong.filter(item => {
            //             return (hienTai - moment(item.ngayTra)) < 2592000*1000;
            //         })
            //         setDanhSachDatPhong(a);
            //         setTongTien(layDoanhThu(a))

            //         break;
            //     case "3thang":
            //         a = danhSachDatPhong.filter(item => {
            //             return (hienTai - moment(item.ngayTra)) < 7776000*1000;
            //         })
            //         setDanhSachDatPhong(a);
            //         setTongTien(layDoanhThu(a))

            //         break;
            //     case "1nam":
            //         a = danhSachDatPhong.filter(item => {
            //             return (hienTai - moment(item.ngayTra)) < 31104000*1000;
            //         })
            //         setDanhSachDatPhong(a);
            //         setTongTien(layDoanhThu(a))

            //         break;
            // }

        }
        else {
            setDanhSachDatPhong(danhSachDatPhong2);
            setTongTien(layDoanhThu(danhSachDatPhong2))
            // console.log("khong co dulieu")
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
            fixed: 'left',
            filterMode: 'tree',
            filterSearch: true,

            ...getColumnSearchProps('tenKhachSan'),
            width: '30%',
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            fixed: 'left',
            width: '10%',
            ...getColumnSearchProps('maPhong'),
        },
        {
            title: 'Người đặt',
            dataIndex: 'hoTen',
            ...getColumnSearchProps('hoTen'),
            filterSearch: true,
            width: '20%',
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
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            ...getColumnSearchProps('diaChi'),
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
            fixed: 'right',
            sorter: (a, b) => a.tongTien - b.tongTien,
            filterSearch: true,
            width: '15%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            fixed: 'right',
            ...getColumnSearchProps('trangThai'),
            filterSearch: true,
            width: '17%',
        },
        // {
        //     title: 'Action',
        //     key: 'operation',

        //     width: 100,
        //     render: (record) =>
        //         <div style={{ display: 'flex' }}>
        //             {record.trangThai === "xetDuyet" ?
        //                 <Button variant="outlined" color="error" onClick={e => huyDat(record.id)} >
        //                     Hủy
        //                 </Button>
        //                 :
        //                 ""
        //             }
        //         </div>

        // },

    ];
    return (
        <div className='hotelList-container'>
            <h2>Thống kê</h2>

            <br></br>
            <div className='thongKe' style={{ display: 'flex', justifyContent: 'space-between', width: "50%" }}>

                <Form.Item label="Tên khách sạn" name="vaiTro"

                >
                    <Select style={{ width: '250px' }}
                        dropdownStyle={{ zIndex: 2000 }}
                        onChange={value => luuTenKhachSan(value)}
                    >
                        <Option value="">Toàn bộ</Option>
                        {danhSachKhachSan.map(item => {
                            return (
                                <Option
                                    key={item.id}
                                    value={item.tenKhachSan}

                                >{item.tenKhachSan}</Option>
                            )
                        })}

                    </Select>
                </Form.Item>
           
                <Form.Item label="Khung thời gian" name="vaiTro"

                >
                    <RangePicker onChange={value => chonMocThoiGian(value)} />
                    {/* <Select style={{ width: '250px' }}
                        dropdownStyle={{ zIndex: 2000 }}
                        onChange={value => chonMocThoiGian(value)}
                    >
                        
                        <Option value="">Toàn bộ</Option>
                        <Option value="1tuan">1 tuần</Option>
                        <Option value="1thang">1 tháng </Option>
                        <Option value="3thang">3 tháng </Option>
                        <Option value="1nam">1 năm </Option>
                    </Select> */}
                </Form.Item>
            </div>

            <br></br>
            <Form.Item

            >
                <InputNumber

                    style={{ width: '250px' }}
                    disabled
                    value={tongTien}
                    formatter={(tongTien) => `Tổng thu:  ${tongTien} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(tongTien) => tongTien.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>

            <br></br>
            <br></br>
            <h2>Lịch sử đặt phòng</h2>
            <Table columns={columns} dataSource={danhSachDatPhong} onChange={onChange}
             pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
                style={{ width: '76%' }}
                scroll={{
                    x: 1300,
                }}
            />

        </div>
    )
}

export default Statistical