import React from 'react'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer.js'
import "./components/Dashboard/Dashboard.css"
import AppHeader from "./components/Dashboard/AppHeader.js";
import AdminSideMenu from "./components/Dashboard/AdminSideMenu";
import PageContent from "./components/Dashboard/PageContent";
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignupClient/SignUp'

const App = () => {
  let isAdmin = true
  return (
    <>
       <div className="App">
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <AdminSideMenu />
          <PageContent></PageContent>
        </div>
      </div>

    </>

  )
}

export default App
