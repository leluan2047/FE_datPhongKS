import React, { useEffect, useState, useForm, useRef } from 'react'
import {
    Button, Form, Input, InputNumber, Drawer
    , message, Modal, Upload, Space, Table, Select, Popover
} from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import "./RoomDetail.scss";
import { Routes, Route, useParams } from 'react-router-dom';
import { axios } from "../../axios"
import Carousel from 'react-elastic-carousel';
import MediaCard from '../Cards/MediaCard';
import Popup from '../Popup';
import Book from '../User/Booking/Book';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function RoomDetail(props) {

    const [img, setimg] = useState('https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
    const [selectedFile, setSelectedFile] = useState([]);
    const [myServiceList, setMyServiceList] = useState([])
    const [myFurnitureList, setMyFurnitureList] = useState([])
    let { id } = useParams();
    // const [room, setRoom] = useState([]);


    const content = (link) => (
        <div
            style={{ height: "270px", width: '300px' }}
        >
            <img src={link} style={{ height: '100%', width: '100%', objectFit: 'cover' }}></img>
        </div>
    );



    const getData = () => {
        // axios
        //     .get(`/hotelManager/room/show/${props.id}`)
        //     .then(res => {
        //         setRoom(res.data[0])
        //         setimg (res.data[0].hinhAnh != null ? Object.values(JSON.parse(res.data[0].hinhAnh))
        //             :
        //             "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png")
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })


        axios
            .get(`/hotelManager/furnitureForRoom/${props.id}`)
            .then(res => {
                var data = []
                res.data.map(item => {
                    var temp = {
                        id: item.id,
                        key: item.id,
                        tenKhachSan: item.tenKhachSan,
                        maPhong: item.maPhong,
                        tenNoiThat: item.tenNoiThat,
                        hinhAnh:
                            <div style={{ height: "30px", width: '50px' }}>
                                <Popover content={content(item.hinhAnh != null ? Object.values(JSON.parse(item.hinhAnh)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png")} trigger="hover">
                                    <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={item.hinhAnh != null ? Object.values(JSON.parse(item.hinhAnh)) : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}></img>
                                </Popover>

                            </div>,
                        moTa: item.moTa,
                        soLuong: item.soLuong
                    }

                    data.push(temp);

                })
                setMyFurnitureList(data)

            })



        // axios
        //     .get(`/hotelManager/roomForHotel/${id}`)
        //     .then(res => {
        //         setMyRoomList(res.data)

        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        setSelectedFile(props.img ? Object.values(JSON.parse(props.img))
            :
            [])

    }

    useEffect(() => {
        getData();
        // console.log(id)
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
            title: 'Tên nội thất',
            dataIndex: 'tenNoiThat',
            key: 'name',
            ...getColumnSearchProps('tenNoiThat'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'name',
            ...getColumnSearchProps('soLuong'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'image',
        },


    ];



    return (
        <div className='roomDetail-container' style={{ width: "800px", paddingLeft: "50px" }}>

            <div className='roomDetail-layout'>

                <div className='left'>
                    <h2 style={{ fontWeight: 'bold' }}>Ảnh phòng</h2>
                    <div className='hotel-img' >
                        <div className='img'>
                            <img src={props.img ? Object.values(JSON.parse(props.img))[0] : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}></img>
                        </div>

                    </div>
                </div>

                <div className='right'>

                    <div className='content'>
                        <i class="fa-solid fa-magnifying-glass"></i> <label style={{ color: 'orange', fontWeight: 'bold' }}>Mã phòng:</label> {props.maPhong}
                    </div>
                    <div className='content'>
                        <i class="fa-solid fa-hotel"></i><label style={{ color: 'orange', fontWeight: 'bold' }}>Diện tích:</label> {props.dienTich} m2
                    </div>
                    <div className='content'>
                        <i class="fa-solid fa-bed"></i>  <label style={{ color: 'orange', fontWeight: 'bold' }}>Số giường:</label> {props.soGiuong}
                    </div>
                    <div className='content'>
                        <i class="fa-solid fa-dollar-sign"></i>  <label style={{ color: 'orange', fontWeight: 'bold' }}>Đơn giá:</label>  {props.donGia} VND
                    </div>

                    {/* <div className='content'>
                        {khachSan.moTa}
                    </div> */}
                </div>

            </div>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <h2>Một số hình ảnh phòng</h2>
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

            <br>

            </br> <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <h2>Một số nội thất, thiết bị có sẵn</h2>

            <Table
                columns={columns}

                dataSource={myFurnitureList}
            />


            <Popup buttonName="Đặt phòng">
                <Book

                    donGia={props.donGia}
                    id={props.id}
                ></Book>
            </Popup>


        </div>
    )
}

export default RoomDetail