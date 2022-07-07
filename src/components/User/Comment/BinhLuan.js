import { React, useState } from 'react';
import 'antd/dist/antd.css';

import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment'

const BinhLuan = (props) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };


    return (
        <div>
           
           
            <Comment
                author={props.email}
                avatar={<Avatar src={props.anhDaiDien[0]} alt="Han Solo" />}
                content={
                    <div>
                        <h4>Khách sạn: {props.tenKhachSan}&nbsp;&nbsp;Phòng {props.maPhong} &nbsp;&nbsp;</h4>
                        <p>
                            {props.noiDung}
                        </p>
                    </div>
                }
                datetime={
                    <Tooltip title={moment(props.ngayDanhGia).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.ngayDanhGia).fromNow()}</span>
                    </Tooltip>
                }
            ></Comment>
        </div>

    );
};

export default BinhLuan;