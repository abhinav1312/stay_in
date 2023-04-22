import React from 'react'

const Modal = ({setShowModal}) => {
  return (
    <div className='absolute inset-0 top-[-215%]  bg-black opacity-60'>
        <div className='w-2xl h-2xl bg-white p-4 opacity-100 text-black'>
            <h1>Hello</h1>
        </div>
      <button className='text-white' onClick={()=>setShowModal(false)}>Click me</button>
    </div>
  )
}

export default Modal
