import LoginForm from '@/components/LoginForm'
import Image from 'next/image'

import React from 'react'

const page = () => {
  return (
    <div className='grid h-screen place-content-center '>
      <Image
        priority={true}
        width={244}
        height={48}
        src='/talentpop.png'
        alt='TalentPop'
        className=' mb-6 -ml-3 object-contain'
      />

      <h1 className=' mb-5 text-4xl font-black text-[#69C920] text-opacity-80'>
        Log in
      </h1>
      <LoginForm />

      <span className='mt-5 ml-1 text-lg font-normal text-[#69C920]'>
        Forgot password?
      </span>
    </div>
  )
}

export default page
