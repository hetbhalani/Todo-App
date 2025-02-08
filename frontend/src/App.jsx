import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return(
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='container bg-white p-5 rounded shadow d-flex' style={{width:'1200px',height:'600px'}}>
          <div className='container bg-primary p-5 rounded h-100 ms-0' style={{width:'45%'}}>
            Add todo
          </div>
          <div className='container bg-primary p-5 ms-3 rounded h-100 me-0'>
            Display todo
          </div>
        </div>
      </div>
    </>
  )
}

export default App
