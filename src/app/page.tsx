'use client'
import React from 'react'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'
// import Stepper from '@/components/Stepper'
import CustomerIntakeForm from '@/components/CustomerIntakeform/CustomerIntakeForm'
import { useSession } from 'next-auth/react'
import Loading from '@/components/loading'
import { useStepperContextContext } from '../../context/StepperContext'
import SelectAgents from '@/components/AgentsSelection/SelectAgents'
import Stepper from '@/components/Stepper'

const HomePage = () => {
  // const session = await getServerSession(authOptions)
  const { status, data } = useSession()
  const { stepperStep, setstepperStep, loading } = useStepperContextContext()

  if (status === 'loading') {
    return <Loading />
  }
  console.log(data)
  // @ts-ignore
  if (data?.user?.customerIntakeFormSubmited) {
    setstepperStep(2)
  }
  // console.log(stepperStep)
  return (
    <div>
      <Stepper />
      {stepperStep === 1 ? (
        <CustomerIntakeForm />
      ) : stepperStep === 2 ? (
        <SelectAgents />
      ) : (
        ''
      )}
    </div>
  )
}

export default HomePage
