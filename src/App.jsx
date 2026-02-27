import './home.css';
import Home from './elements/Home';
import About from './elements/About';
import MyWork from './elements/Work';
import Contact from './elements/Contact';
import Login from './elements/Login';
import Register from './elements/Register';
import Navbar from './elements/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './elements/Error';
import { Logout } from './elements/Logout';
import AdminPanel from './elements/admin-pannel';
import AllUsers from './elements/users';
import AllRequests from './elements/requests';
import AllMessages from './elements/messages';




export default function App() {


  return (
    <div className='body '>
      <BrowserRouter>
        <Navbar />
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<MyWork />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin' element={<AdminPanel />} >
            <Route path='users' element={<AllUsers />} />
            <Route path='requests' element={<AllRequests />} />
            <Route path='contacts' element={<AllMessages />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
