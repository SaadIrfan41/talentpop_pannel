'use client'
import useAxios from 'axios-hooks'
import React from 'react'
import Loading from '../loading'

// async function getData() {
//   const res = await fetch('http://localhost:3000/api/customerintakeform', {
//     method: 'GET',
//   })
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   console.log(res)
//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

const ClientRequirements = () => {
  //   const data = await getData()
  //   console.log(data)
  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customerintakeform`
  )

  if (loading) return <Loading />
  if (error) return <p>Error!</p>
  console.log(data)
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default ClientRequirements
