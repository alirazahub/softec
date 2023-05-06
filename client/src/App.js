import React from 'react'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer.js'
import "./components/Dashboard/Dashboard.css"
import AppHeader from "./components/Dashboard/AppHeader.js";
import AdminSideMenu from "./components/Dashboard/AdminSideMenu";
import PageContent from "./components/Dashboard/PageContent";
const App = () => {
  let isAdmin = false
  return (
    <>
      {isAdmin ? (
        <div>
          <div className='d-flex flex-column h-100'>
            <Navbar />
          </div>

          <div className='container' style={{ marginTop: 100 }}>
            <Home />
          </div>

          <Footer />
        </div>
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
