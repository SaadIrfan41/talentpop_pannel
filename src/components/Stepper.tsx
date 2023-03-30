'use client'
import React from 'react'
import { CheckIcon } from './Icons'
import { useStepperContextContext } from '../../context/StepperContext'
const steps = [
  {
    stepNumb: 'Step 1',
    name: 'Fill out the Customer Intake Form',
    href: '#',
    status: 'current',
  },
  {
    stepNumb: 'Step 2',
    name: 'Receive 3 potential candidate profiles',
    href: '#',
    status: 'upcoming',
  },
  {
    stepNumb: 'Step 3',
    name: 'Choose from the 3 candidates or request 3 more!',
    href: '#',
    status: 'upcoming',
  },
  {
    stepNumb: 'Step 4',
    name: 'Finalize candidate and begin live training!',
    href: '#',
    status: 'upcoming',
  },
]

const Stepper = () => {
  const { stepperStep } = useStepperContextContext()

  return (
    <div className=' mx-auto max-w-7xl'>
      <div className=' mt-20 flex justify-center'>
        <img src='/talentpop.png' alt='' />
      </div>
      <div className=' relative mt-20 flex'>
        {/* <div className='absolute mx-auto h-0.5 w-full max-w-6xl bg-indigo-600 px-10' /> */}
        {steps.map(({ stepNumb, name, status }, index) => (
          <div key={index} className='flex items-center '>
            {stepperStep > index + 1 ? (
              <CheckIcon className=' mx-3 h-12 w-12 text-[#69C920]' />
            ) : (
              <span className='mx-3 flex h-9 items-center' aria-hidden='true'>
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    stepperStep === index + 1
                      ? 'border-[#69C920]'
                      : 'border-[#EBEBEB] '
                  }  bg-white`}
                >
                  <span
                    className={`h-2.5  w-2.5 rounded-full ${
                      stepperStep === index + 1 ? 'bg-[#69C920]' : 'bg-white'
                    }`}
                  />
                </span>
              </span>
            )}
            <div
              className={`max-h-32 rounded-2xl ${
                stepperStep === index + 1 ? 'bg-[#D4FFCD]' : 'bg-[#EBEBEB]'
              }  px-2 py-3 text-center`}
            >
              <h1 className=' text-xl font-extrabold text-[#69C920]'>
                {stepNumb}
              </h1>
              <p className=' max-w-xs text-lg font-bold text-[#4B4B4B] text-opacity-75'>
                {name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stepper
