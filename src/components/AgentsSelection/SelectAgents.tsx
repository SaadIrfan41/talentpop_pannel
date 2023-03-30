import React from 'react'
import ClientRequirements from './ClientRequirements'
const agents = [
  {
    id: '#Agent ID',
    name: 'Shuhratbek',
    image: '/agentsAvatar.png',
  },
  {
    id: '#Agent ID',
    name: 'Shuhratbek',
    image: '/agentsAvatar.png',
  },
  {
    id: '#Agent ID',
    name: 'Shuhratbek',
    image: '/agentsAvatar.png',
  },
  {
    id: '#Agent ID',
    name: 'Shuhratbek',
    image: '/agentsAvatar.png',
  },
]
const SelectAgents = () => {
  return (
    <div className='mt-8 '>
      <div className='grid grid-cols-2 divide-x-4 divide-dashed'>
        <div className='mx-auto'>
          {' '}
          <h1 className='  mb-9 ml-8 text-3xl font-bold'>
            Client Requirements
          </h1>
          <ClientRequirements />
        </div>
        <div className=' mx-auto pl-14 '>
          <h1 className=' mb-9 text-3xl font-bold'>
            V2 Candidates that match all client filter inputs
          </h1>
          <div className=' flex flex-col justify-start gap-y-14'>
            {agents.map(({ name, id, image }, index) => (
              <div
                key={index}
                className=' flex  items-center space-x-16 rounded-xl'
              >
                <div className='flex gap-x-5'>
                  <div className='shrink-0 '>
                    <img
                      className='h-12 w-12'
                      src={image}
                      alt={'Agent Image'}
                    />
                  </div>
                  <div>
                    <div className='text-xl font-medium text-black'>{name}</div>
                    <p className='text-slate-500'>{id}</p>
                  </div>
                </div>
                <button className=' rounded-full bg-[#69C920] bg-opacity-75 py-2 px-4 text-lg font-medium text-white shadow-md outline-none '>
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectAgents
