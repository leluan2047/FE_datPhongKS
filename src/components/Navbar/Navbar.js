import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, Space, Drawer } from 'antd';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa'
import Login from "../Auth/Login"
import Popup from '../Popup';
import { Link as L } from 'react-scroll'
import './Navbar.scss'
import Register from '../Auth/Register'
import { useNavigate } from 'react-router-dom';
import { axios } from '../../axios'





function Navbar() {
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const [visible2, setVisible2] = useState(false);




    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to={localStorage.getItem("vaiTro") == "hotelManager" ?
                            "/hotelManager"
                            :
                            localStorage.getItem("vaiTro") == "user" ? "/user" : "/admin"
                        }>
                            Dashboard
                        </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div
                            onClick={
                                e => {

                                    axios
                                        .get("/logout")
                                        .then(res => {
                                            localStorage.clear()
                                            window.alert("Đăng xuất thành công")
                                            navigate('/')
                                            // console.log(res)

                                        })
                                        .catch(err => {
                                            localStorage.clear()
                                            console.log(err);
                                        })
                                }
                            }
                        >Đăng xuất</div>
                    ),
                },

            ]}
        />
    );



    return (
        <div className='navbar-container'>
            <div className={nav ? 'navbar navbar-bg' : 'navbar'}>
                <div className={nav ? 'logo dark' : 'logo'}>
                    <Link to="/">
                        <h2>TRAVEL</h2>
                    </Link>
                </div>
                
                <ul className="nav-menu">
                    <li>Home</li>
                    <li><L to="1" spy={true} smooth={true} style={{color:'white'}}>Destinations</L></li>
                    <li><L to="2" spy={true} smooth={true} style={{color:'white'}}>Travel</L></li>
                    <li><L to="3" spy={true} smooth={true} style={{color:'white'}}>Book</L></li>
                </ul>
                {
                    localStorage.getItem("hoTen") == null ?
                        <div className="nav-button">
                            <button onClick={e => setVisible(true)}>
                                Sign In
                            </button>
                            <Drawer title="Đăng nhập tài khoản" placement="right" onClose={e => setVisible(false)} visible={visible}>
                                <Login></Login>
                            </Drawer>
                            <button onClick={e => setVisible2(true)}>
                                Sign Up
                            </button>
                            <Drawer title="Đăng ký tài khoản" placement="right" onClose={e => setVisible2(false)} visible={visible2}>
                                <Register></Register>
                            </Drawer>
                        </div>
                        :
                        <div className='welcome nav-button' >
                            <Space direction="vertical">
                                <Space wrap>

                                    <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                        <Avatar icon={<img src={localStorage.getItem("hinhAnh")}></img>} />
                                    </Dropdown>

                                </Space>
                            </Space>

                        </div>
                }
                <div className="hamburger" onClick={handleNav}>
                    {!nav ? (<HiOutlineMenuAlt4 className='icon' />) : (<AiOutlineClose style={{ color: 'white' }} className='icon' />)}

                </div>

                <div className={nav ? 'mobile-menu active' : 'mobile-menu'}>
                    <ul className="mobile-nav">
                        <li>Home</li>
                        <li>Destinations</li>
                        <li>Travel</li>
                        <li>Book</li>
                    </ul>
                    <div className="mobile-menu-bottom">
                        {localStorage.getItem('hoTen') == null ?
                            <div className="menu-icons">
                                <button onClick={e => setVisible(true)}>
                                    Sign In

                                </button>
                                <Drawer title="Đăng nhập tài khoản" placement="right" onClose={e => setVisible(false)} visible={visible}>
                                    <Login></Login>
                                </Drawer>
                                <button onClick={e => setVisible2(true)}>Sign Up</button>
                                <Drawer title="Đăng ký tài khoản" placement="right" onClose={e => setVisible2(false)} visible={visible2}>
                                    <Register></Register>
                                </Drawer>
                            </div>
                            :
                            ""
                        }
                        <div className="social-icons">
                            <FaFacebook className='icon' />
                            <FaInstagram className='icon' />
                            <FaTwitter className='icon' />
                            <FaPinterest className='icon' />
                            <FaYoutube className='icon' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar