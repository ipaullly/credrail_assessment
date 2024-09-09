import React, { useContext } from 'react'
import { GiAbstract050 } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../AppContext'
import { CgLogOff } from 'react-icons/cg'

const SideBar = () => {
  const { userInfo } = useContext(AppContext);
  let location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex flex-col h-20 items-start justify-end rounded-md bg-amber-600 p-4 md:h-40"
        to={'/'}
      >
        <span className='text-white text-xl mb-4 md:mb-20'>Hello {userInfo['first-name'] + ' ' + userInfo['last-name']}</span>
        <div className="w-32 text-white md:w-40">
          <GiAbstract050 />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Link
          to={'/'}
          className={
            `flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            ${
              location.pathname === '/' ? 'bg-sky-100 text-blue-600': 'bg-gray-50'
            }`
          }
        >
          <p className="">{'File Upload'}</p>
        </Link>
        <Link
          to={'/details'}
          className={
            `flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            ${
              location.pathname === '/details' ? 'bg-sky-100 text-blue-600': 'bg-gray-50'
            }`
          }
        >
          <p className="">{'Details'}</p>
        </Link>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <Link to={`/login`}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <CgLogOff />
            <div className="hidden md:block">Sign Out</div>
          </button>
          </Link>
      </div>
    </div>
  )
}

export default SideBar