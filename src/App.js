import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Footer from './components/Footer/Footer';

import Home from './components/Pages/Home/Home';
import HotelDirectorDB from './components/Pages/Dashboard/HotelDirector/HotelDirectorDB';
import UserDashboard from './components/Pages/Dashboard/User/UserDashboard';
import AdminDashboard from './components/Pages/Dashboard/Admin/AdminDashboard';
import SearchResults from './components/SearchResults/SearchResults';
import HotelDetail from './components/SearchResults/HotelDetail';
import BookRequest from './components/HotelDirector/Booking/BookRequest';
import ThongKePhanHoi from './components/Admin/ThongKeTuongTac/ThongKePhanHoi';
import ThongKeBaiDangKS from './components/Admin/ThongKeTuongTac/ThongKeBaiDangKS';




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>

          <Route exact path="/hotelManager" element={<HotelDirectorDB />}></Route>
          <Route exact path="/user" element={<UserDashboard />}></Route>
          <Route exact path="/admin" element={<AdminDashboard />}></Route>
          
          <Route exact path="/search/:destination" element={<SearchResults></SearchResults>}></Route>
          <Route exact path="/hotelDetail/:id" element={<HotelDetail />}></Route>

          <Route exact path="/datPhong/thanhToanThanhCong/:message" element={<div>
            thanh toan thanh cong
          </div>}></Route>
        </Routes>


        <Footer></Footer>
       
      </Router>
    </div>
  );
}

export default App;
