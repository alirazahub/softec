import React,{useState,useEffect} from 'react'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer.js'
import "./components/Dashboard/Dashboard.css"
import AppHeader from "./components/Dashboard/AppHeader.js";
import AdminSideMenu from "./components/Dashboard/AdminSideMenu";
import PageContent from "./components/Dashboard/PageContent";
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignupClient/SignUp'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { url } from './key'
const App = () => {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['customerToken', 'adminToken']);
  // eslint-disable-next-line
  const [customer, setCustomer] = useState({})
 const [isAdmin, setIsAdmin] = useState(true)

  useEffect(() => {
    const getProfiles = async () => {
      const  res = await axios.get(`${url}/api/customer/profile`, {
        headers: {
          'customerToken': cookies.customerToken,
        }
      })
      setCustomer(res.data)
    }
    getProfiles()
    const getAdminProfiles = async () => {
      const  res = await axios.get(`${url}/api/admin/profile`, {
        headers: {
          'adminToken': cookies.customerToken,
        }
      })
      setCustomer(res.data)
    }
    getAdminProfiles();
  }, [cookies])
  
 
  return (
    <>
      {isAdmin ? (
        <>
          <div className='d-flex flex-column h-100'>
            <Navbar />
          </div>

          <div className='container' style={{ marginTop: 100 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<SignUp setIsAdmin={setIsAdmin} />} />
            </Routes>
          </div>
          <Footer />
        </>

      ) : (<div className="App">
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <AdminSideMenu />
          <PageContent></PageContent>
        </div>
      </div>)}
    </>

  )
}

export default App
