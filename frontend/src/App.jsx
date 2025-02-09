import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='mb-4 text-white'>Todo-App</h1>
        <div className='container bg-white p-5 rounded shadow d-flex' style={{ width: '1200px', height: '500px' }}>
          <div className='container bg-light p-5 rounded h-100 ms-0' style={{ width: '45%' }}>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Title</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter title here..."/>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
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
