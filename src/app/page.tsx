import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
const HomePage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      HomePage
      <pre>{JSON.stringify(session)}</pre>
    </div>
  )
}

export default HomePage
