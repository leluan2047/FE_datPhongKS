import React from 'react'
import './Footer.scss'
function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-details1'>
                <div className='footer-left'>
                    <div className='footer-logo'>
                        <h1>TRAVEL</h1>
                    </div>
                </div>
                <div className='footer-right'>
                    <div className='footer-info'>
                        <div className='footer-info-title'>
                            Thông tin
                        </div>
                        <div className='footer-info-content'>
                            <div className='content'>
                                Tiểu sử
                            </div>
                            <div className='content'>
                                Khách hàng
                            </div>
                            <div className='content'>
                                Chứng thực
                            </div>
                        </div>
                    </div>

                    <div className='footer-info'>
                        <div className='footer-info-title'>
                            Dịch vụ
                        </div>
                        <div className='footer-info-content'>
                            <div className='content'>
                                Quảng cáo
                            </div>
                            <div className='content'>
                                Tư vấn
                            </div>
                            <div className='content'>
                                Nhà phát triển
                            </div>
                            <div className='content'>
                                Thiết kế
                            </div>
                        </div>
                    </div>
                    <div className='footer-info'>
                        <div className='footer-info-title'>
                            Tương tác
                        </div>
                        <div className='footer-info-content'>
                            <div className='content'>
                                Hà Nội
                            </div>
                            <div className='content'>
                                Tp. Hồ Chí Minh
                            </div>
                            <div className='content'>
                                Tp. Đà Nẵng
                            </div>
                            <div className='content'>
                                Quảng Ninh
                            </div>
                        </div>
                    </div>
                    <div className='footer-info'>
                        <div className='footer-info-title'>
                            Xã hội
                        </div>
                        <div className='footer-info-content'>
                            <div className='content icon'>
                                <i class="fa-brands fa-facebook-square"> Facebook</i>
                                <i class="fa-brands fa-instagram"> Instagram</i>
                                <i class="fa-brands fa-youtube"> Youtube</i>
                                <i class="fa-brands fa-twitter"> Twitter</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-details2'>
                <p>Một số dịch vụ liên quan</p>
                <div className='footer-partner'>
                    <img src='https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png'></img>
                    <img src='https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png'></img>
                    <img src='https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png'></img>
                    <img src='https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_rentalcars/6bc5ec89d870111592a378bbe7a2086f0b01abc4.png'></img>
                    <img src='https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_opentable/a4b50503eda6c15773d6e61c238230eb42fb050d.png'></img>
                </div>
            </div>
        </div>
    )
}

export default Footer