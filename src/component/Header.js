import React from 'react'
import * as image from "../utilities/images"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className='mainNav'>
        <div className='row'>
          <div className='col-lg-6 col-9'>
            <div className='navLeft'></div>
            <h2 className='mainHeading pointHand'
              onClick={() => (navigate("/"))}
            >
            TODO List
            </h2>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header