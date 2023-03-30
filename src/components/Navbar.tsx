import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-black'>
      <div>
        <img src='/logo.png' alt='TalentPop Logo' />
        <span>Welcome TalentPop</span>
        <div className=' h-1 w-4 rounded-full bg-[#00FF0A]' />
        <div className=' h-1 w-4 rounded-full bg-[#00FF0A]' />
        <div className=' h-1 w-4 rounded-full bg-[#00FF0A]' />
      </div>
    </nav>
  )
}

export default Navbar
