import React, { useEffect, useState, useForm, useRef } from 'react'
import { Table, message, Spin, Input, Space, Popconfirm, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '@mui/material/Button';

import { axios } from "../../../axios";
import Popup from '../../Popup';
import AddService from './AddService';
import EditService from './EditService';

const text = 'Bạn có chắc là muốn xóa ?';
function ServiceList() {

  const [myServiceList, setMyServiceList] = useState([])

  const confirm = (id) => {
    deleteData(id)
  };

  const deleteData = (id) => {
    axios
      .get(`/hotelManager/service/destroy/${id}`)
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

  const content = (link) => (
    <div style={{ height: "270px", width: '300px' }}>
      <img src={link} style={{ height: '100%', width: '100%', objectFit: 'cover' }}></img>
    </div>
  );

  const getData = () => {
    axios
      .get('/hotelManager/myService')
      .then(res => {
        var data = []
        res.data.map(item => {

          var temp = {
            id: item.id,
            key: item.id,
            tenKhachSan:item.tenKhachSan,
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
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData();
    console.log("Servicelist render")
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

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render: (record) =>
        <div style={{ display: 'flex' }}>

          <Popup title="Chỉnh sửa thông tin dịch vụ" buttonName={<i className='fas fa-pencil-alt' ></i>} handleReload={getData}>
            <EditService id={record.id}></EditService>
          </Popup>

          &nbsp;&nbsp;&nbsp;

          <Popconfirm placement="top" title={text} onConfirm={e => confirm(record.id)} okText="Yes" cancelText="No">
            <Button variant="contained"  >
              <i className='fas fa-trash'></i>
            </Button>
          </Popconfirm>

        </div>
    },
  ];



  return (
    <div className='service-container'>
      <Popup buttonName="+ Thêm dịch vụ" handleReload={getData} title="Thêm dịch vụ">
        <AddService></AddService>
      </Popup>
      <br></br>
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
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
      />
    </div>
  )
}

export default ServiceList