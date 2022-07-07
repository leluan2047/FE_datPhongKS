import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Popup from '../Popup';
import RoomDetail from '../SearchResults/RoomDetail';
import Book from '../User/Booking/Book';

export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="185"
        image={props.src ? Object.values(JSON.parse(props.src))[0] : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"}
        alt="green iguana"
        
      />
      <CardContent>
        <Typography variant="body2" component="div">
          {props.donGia} VND/ngày
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Số giường:  {props.soGiuong}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Diện tích:{props.dienTich} m2
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.moTa}
        </Typography>

      </CardContent>
      <CardActions>
        <Popup title="Đặt phòng" buttonName="Đặt ngay">
            <Book
              id={props.id}
              donGia = {props.donGia}
            >

            </Book>
        </Popup>
        <Popup title="Xem chi tiết phòng" buttonName="Chi tiết">
          <RoomDetail
            id={props.id}
            key={props.id}
            img={props.src}
            donGia={props.donGia}
            soGiuong={props.soGiuong}
            maPhong={props.maPhong}
            dienTich={props.dienTich}
          >

          </RoomDetail>
        </Popup>

      </CardActions>
    </Card>
  );
}
