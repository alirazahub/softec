import React from 'react'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'


const App = () => {
  return (
    <>
      <div className='d-flex flex-column h-100'>
        <Navbar />
      </div>

      <div className='container' style={{ marginTop: 100 }}>
        <Home />
      </div>
    </>

  )
}

export default App
