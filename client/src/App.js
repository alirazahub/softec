import React from 'react'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer.js'

const App = () => {
  return (
    <>
      <div className='d-flex flex-column h-100'>
        <Navbar />
      </div>

      <div className='container' style={{ marginTop: 100 }}>
        <Home />
      </div>

      <Footer />

    </>

  )
}

export default App
