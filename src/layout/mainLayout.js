import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'



const MainLayout = () => {

    return (
        <>
            <Header />
            <div className='commonOuter'>
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout