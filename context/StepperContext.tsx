'use client'

import { useSession } from 'next-auth/react'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface StepperTypes {
  stepperStep: number
  setstepperStep: Dispatch<SetStateAction<number>>
  loading: boolean
  setloading: Dispatch<SetStateAction<boolean>>
}

const StepperContext = createContext<StepperTypes>({
  stepperStep: 1,
  setstepperStep: (): number => 1,
  loading: false,
  setloading: (): boolean => false,
})

export const StepperContextContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // const { status, data } = useSession()
  const [stepperStep, setstepperStep] = useState(1)
  // const { status, data } = useSession()
  const [loading, setloading] = useState(false)
  // if (status === 'loading') {
  //   setloading(true)
  // }
  //@ts-ignore
  // if (data?.user?.customerIntakeFormSubmited) {
  //   setstepperStep(2)
  // }

  return (
    <StepperContext.Provider
      value={{
        stepperStep,
        setstepperStep,
        loading,
        setloading,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}
export const useStepperContextContext = () => useContext(StepperContext)
