import React, { useEffect, useState, useForm, useRef } from 'react'
import { Button, Form, Input, InputNumber, Spin, message, DatePicker, Modal, Upload, Space, Table, Select, Popover } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import "./HotelDetail.scss";
import { Routes, Route, useParams } from 'react-router-dom';
import { axios } from "../../axios"
import Carousel from 'react-elastic-carousel';
import MediaCard from '../Cards/MediaCard';
import BinhLuan from '../User/Comment/BinhLuan';
import moment from "moment"

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


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


function HotelDetail(props) {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState([]);
    const [myServiceList, setMyServiceList] = useState([])
    let { id } = useParams();
    const [khachSan, setKhachSan] = useState([]);
    const [myRoomList, setMyRoomList] = useState([]);
    const [myRoomList2, setMyRoomList2] = useState([]);
    const [danhSachDanhGia, setDanhSachDanhGia] = useState([])

    const breakPoints = [
        { width: 300, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1100, itemsToShow: 3 },
    ]



    const content = (link) => (
        <div
            style={{ height: "270px", width: '300px' }}
        >
            <img src={link} style={{ height: '100%', width: '100%', objectFit: 'cover' }}></img>
        </div>
    );



    const getData = () => {
        axios
            .get(`/hotelManager/show/${id}`)
            .then(res => {
                console.log(res.data)
                setKhachSan(res.data[0])

                setSelectedFile(res.data[0].hinhAnh != null ? Object.values(JSON.parse(res.data[0].hinhAnh))
                    :
                    [])

                setimg(res.data[0].hinhAnh != null ? Object.values(JSON.parse(res.data[0].hinhAnh))[0]
                    :
                    "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png")
            })
            .catch(err => {
                console.log(err)
            })


        axios
            .get(`/hotelManager/serviceForHotel/${id}`)
            .then(res => {
                var data = []
                res.data.map(item => {

                    var temp = {
                        id: item.id,
                        key: item.id,
                        tenKhachSan: item.tenKhachSan,
                        tenDichVu: item.tenDichVu,
                        hinhAnh:
                            <div style={{ height: "30px", width: '50px' }}>

                                <Popover content={content(item.hinhAnh != null ? Object.values(JSON.parse(item.hinhAnh)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png")} trigger="hover">
                                    <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={item.hinhAnh != null ? Object.values(JSON.parse(item.hinhAnh)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}></img>
                                </Popover>

                            </div>,
                        moTa: item.moTa
                    }

                    data.push(temp);

                })
                setMyServiceList(data);

            })

        axios
            .get(`/hotelManager/roomForHotel/${id}`)
            .then(res => {
                setMyRoomList2(res.data)
                setMyRoomList(res.data)

            })
            .catch(err => {
                console.log(err)
            })

        axios
            .get(`/danhGia/danhGiaKhachSan/${id}`)
            .then(res => {
                setDanhSachDanhGia(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData();
        // console.log(id)
    }, [])


    const onFinish = (values) => {



    };

    const onChange = (dates, dateStrings) => {

        // let thanhTien = ((dates[1] - dates[0]) / 3600000) * (props.donGia / 24)
        //   console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);


        if (dates) {
            axios
                .post(`/datPhong/phongTrongThuocKhachSan/${id}`, {
                    ngayNhan: moment(dateStrings[0]).format('YYYY-MM-DDTHH:mm:ss'),
                    ngayTra: moment(dateStrings[1]).format('YYYY-MM-DDTHH:mm:ss'),
                })
                .then(res => {

                    setMyRoomList(res.data)

                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            setMyRoomList(myRoomList2);
        }

    };




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
            key: 'name',
            ...getColumnSearchProps('tenKhachSan'),
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDichVu',
            key: 'name',
            ...getColumnSearchProps('tenDichVu'),
        },
        {
            title: 'hình Ảnh',
            dataIndex: 'hinhAnh',
            key: 'image',
        },


    ];



    return (
        <div className='hotelDetail-container'>
            <div className='navbarBackground'>

            </div>
            <div className='hotelDetail-container-content'>
                <div className='hotelDetail-layout'>

                    <div className='left'>
                        <h2 style={{ fontWeight: 'bold' }}>Ảnh khách sạn</h2>
                        <div className='hotel-img' >
                            <div className='img'>
                                <img src={img}></img>
                            </div>

                        </div>
                    </div>
                  
                    <div className='right'>
                        <div className='title'>
                            <h2> {khachSan.tenKhachSan}</h2>
                        </div>
                        <div className='content'>
                            <i class="fa-solid fa-user"></i> <label style={{ color: 'brown', fontWeight: 'bold' }}>Người quản lý:</label> {khachSan.email}
                        </div>
                        <div className='content'>
                            <i class="fa-solid fa-phone"></i> <label style={{ color: 'brown', fontWeight: 'bold' }}>Số điện thoại:</label> {khachSan.soDienThoai}
                        </div>
                        <div className='content'>
                            <i class="fa-solid fa-hotel"></i>  <label style={{ color: 'brown', fontWeight: 'bold' }}>Diện tích:</label> {khachSan.dienTich} m2
                        </div>
                        <div className='content'>
                            <i class="fa-solid fa-location-dot"></i> <label style={{ color: 'brown', fontWeight: 'bold' }}>Địa chỉ:</label>  {khachSan.diaChi}
                        </div>
                        <br></br>
                        {khachSan.moTa}
                        {/* <div className='content'>
        {khachSan.moTa}
    </div> */}
                    </div>

                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <h2>Một số hình ảnh khách sạn</h2>
                <br>
                </br>
                <br></br>
                {selectedFile ?
                    <Box sx={{ width: '700px', height: 450, overflowY: 'scroll' }}>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {selectedFile.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                        src={item}
                                        srcSet={item}

                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                    :
                    ""}
                <br>
                </br>
                <br></br>
                <hr></hr>
                <br></br>
                <h2>Một số dịch vụ đi kèm</h2>

                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                {record.moTa}
                            </p>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                    dataSource={myServiceList}
                />

                <br></br>
                <hr></hr>
                <br></br>

                <h2>Các phòng thuộc khách sạn</h2>
                <br></br>
                <p>Tìm kiếm phòng trống</p>
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
                </Form>
                <br></br>
                <Carousel breakPoints={breakPoints}>
                    {
                        myRoomList.map(item => {
                            return (
                                <MediaCard
                                    id={item.id}
                                    key={item.id}
                                    src={item.hinhAnh}
                                    donGia={item.donGia}
                                    soGiuong={item.soGiuong}
                                    maPhong={item.maPhong}
                                    dienTich={item.dienTich}
                                ></MediaCard>
                            );
                        })
                    }
                </Carousel>
                <br></br>
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <h2>Một số phản hồi tham khảo</h2>
                {danhSachDanhGia.map(item => {
                    return (
                        <BinhLuan
                            key={item.id}
                            noiDung={item.noiDung}
                            ngayDanhGia={item.ngayDanhGia}
                            maPhong={item.maPhong}
                            tenKhachSan={item.tenKhachSan}
                            email={item.email}
                            anhDaiDien={item.anhDaiDien != null ? Object.values(JSON.parse(item.anhDaiDien)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}
                        >

                        </BinhLuan>
                    )
                })}
            </div>
        </div>
    )
}

export default HotelDetail