import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Hader from './components/Layout/Hader/Hader';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payment/Subscribe';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentSucces from './components/Payment/PaymentSucces';
import PaymentFail from './components/Payment/PaymentFail';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourses from './components/Admin/CreateCourses/CreateCourses';
import AdminCourse from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/User';
function App() {
  //for prevent right click

  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault()
  // });

  return (
    <Router>
      <Hader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />

        <Route path="/fogetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSucces />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/course/:id" element={<CoursePage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createcourse" element={<CreateCourses />} />
        <Route path="/admin/courses" element={<AdminCourse />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
