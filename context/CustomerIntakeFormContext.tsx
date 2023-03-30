'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface CustomerIntakeFormTypes {
  stepNumb: number
  setStepNumb: Dispatch<SetStateAction<number>>

  businessName: string
  setBusinessName: Dispatch<SetStateAction<string>>
  websiteURL: string
  setWebsiteURL: Dispatch<SetStateAction<string>>
  firstName: string
  setFirstName: Dispatch<SetStateAction<string>>
  lastName: string
  setLastName: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  phoneNumber: string
  setPhoneNumber: Dispatch<SetStateAction<string>>
  corporateName: string
  setCorporateName: Dispatch<SetStateAction<string>>
  businessAddress: string
  setBusinessAddress: Dispatch<SetStateAction<string>>
  aboutBusiness: string
  setAboutBusiness: Dispatch<SetStateAction<string>>
  tasks: string[]
  setTasks: Dispatch<SetStateAction<string[]>>
  commonQuestions: string[]
  setCommonQuestions: Dispatch<SetStateAction<string[]>>
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
  inboundPhoneSupport: string
  setInboundPhoneSupport: Dispatch<SetStateAction<string>>
  customerServicePlatform: string
  setCustomerServicePlatform: Dispatch<SetStateAction<string>>
  platformName: string
  setPlatformName: Dispatch<SetStateAction<string>>
  ecommercePlatform: string
  setEcommercePlatform: Dispatch<SetStateAction<string>>
  qaSheetAvaliable: string
  setqaSheetAvaliable: Dispatch<SetStateAction<string>>
  numAgents: number | undefined
  setNumAgents: Dispatch<SetStateAction<number | undefined>>
  qaSheet: any
  setQaSheet: Dispatch<SetStateAction<any>>
  agentWorkingHours: number | undefined
  setAgentWorkingHours: Dispatch<SetStateAction<number | undefined>>
  agentWorkingDays: number | undefined
  setAgentWorkingDays: Dispatch<SetStateAction<number | undefined>>
  genderPreference: string
  setGenderPreference: Dispatch<SetStateAction<string>>
  agentStartUpDate: Date
  setAgentStartUpDate: Dispatch<SetStateAction<Date>>
  submitDateUTC: Date
  setSubmitDateUTC: Dispatch<SetStateAction<Date>>
  startDateUTC: Date
  setStartDateUTC: Dispatch<SetStateAction<Date>>
  returnPolicy: string
  setReturnPolicy: Dispatch<SetStateAction<string>>
  escalationContact: string
  setEscalationContact: Dispatch<SetStateAction<string>>
}

const CustomerIntakeFormContext = createContext<CustomerIntakeFormTypes>({
  stepNumb: 0,
  setStepNumb: (): number => 0,
  businessName: '',
  setBusinessName: (): string => '',
  websiteURL: '',
  setWebsiteURL: (): string => '',
  firstName: '',
  setFirstName: (): string => '',
  lastName: '',
  setLastName: (): string => '',
  email: '',
  setEmail: (): string => '',
  phoneNumber: '',
  setPhoneNumber: (): string => '',
  corporateName: '',
  setCorporateName: (): string => '',
  businessAddress: '',
  setBusinessAddress: (): string => '',
  aboutBusiness: '',
  setAboutBusiness: (): string => '',
  tasks: [],
  setTasks: (): string[] => [],
  commonQuestions: [],
  setCommonQuestions: (): string[] => [],
  tags: [],
  setTags: (): string[] => [],
  inboundPhoneSupport: '',
  setInboundPhoneSupport: (): string => '',
  customerServicePlatform: '',
  setCustomerServicePlatform: (): string => '',
  platformName: '',
  setPlatformName: (): string => '',
  ecommercePlatform: '',
  setEcommercePlatform: (): string => '',
  qaSheetAvaliable: '',
  setqaSheetAvaliable: (): string => '',
  qaSheet: '',
  setQaSheet: (): any => '',
  numAgents: 0,
  setNumAgents: (): number => 0,
  agentWorkingHours: 1,
  setAgentWorkingHours: (): number => 1,
  agentWorkingDays: 1,
  setAgentWorkingDays: (): number => 1,
  genderPreference: '',
  setGenderPreference: (): string => '',
  agentStartUpDate: new Date(),
  setAgentStartUpDate: (): Date => new Date(),
  startDateUTC: new Date(),
  setStartDateUTC: (): Date => new Date(),
  submitDateUTC: new Date(),
  setSubmitDateUTC: (): Date => new Date(),
  returnPolicy: '',
  setReturnPolicy: (): string => '',
  escalationContact: '',
  setEscalationContact: (): string => '',
})

export const CustomerIntakeFormContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [stepNumb, setStepNumb] = useState(0)
  const [businessName, setBusinessName] = useState('')
  const [websiteURL, setWebsiteURL] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [corporateName, setCorporateName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [aboutBusiness, setAboutBusiness] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [inboundPhoneSupport, setInboundPhoneSupport] = useState('')
  const [customerServicePlatform, setCustomerServicePlatform] = useState('')
  const [platformName, setPlatformName] = useState('')
  const [ecommercePlatform, setEcommercePlatform] = useState('')
  const [qaSheetAvaliable, setqaSheetAvaliable] = useState('')
  const [qaSheet, setQaSheet] = useState<File | null>(null)
  const [numAgents, setNumAgents] = useState<number | undefined>()
  const [agentWorkingHours, setAgentWorkingHours] = useState<
    number | undefined
  >()
  const [agentWorkingDays, setAgentWorkingDays] = useState<number | undefined>()
  const [genderPreference, setGenderPreference] = useState('')
  const [agentStartUpDate, setAgentStartUpDate] = useState(new Date())
  const [returnPolicy, setReturnPolicy] = useState('')
  const [commonQuestions, setCommonQuestions] = useState<string[]>([])
  const [escalationContact, setEscalationContact] = useState('')
  const [startDateUTC, setStartDateUTC] = useState(new Date())
  const [submitDateUTC, setSubmitDateUTC] = useState(new Date())
  const [tags, setTags] = useState<string[]>([])
  return (
    <CustomerIntakeFormContext.Provider
      value={{
        stepNumb,
        setStepNumb,
        businessName,
        setBusinessName,
        firstName,
        setFirstName,
        websiteURL,
        setWebsiteURL,
        lastName,
        setLastName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        corporateName,
        setCorporateName,
        businessAddress,
        setBusinessAddress,
        aboutBusiness,
        setAboutBusiness,
        tasks,
        setTasks,
        inboundPhoneSupport,
        setInboundPhoneSupport,
        customerServicePlatform,
        setCustomerServicePlatform,
        platformName,
        setPlatformName,
        ecommercePlatform,
        setEcommercePlatform,
        qaSheetAvaliable,
        setqaSheetAvaliable,
        qaSheet,
        setQaSheet,
        numAgents,
        setNumAgents,
        agentWorkingHours,
        setAgentWorkingHours,
        agentWorkingDays,
        setAgentWorkingDays,
        genderPreference,
        setGenderPreference,
        agentStartUpDate,
        setAgentStartUpDate,
        returnPolicy,
        setReturnPolicy,
        commonQuestions,
        setCommonQuestions,
        escalationContact,
        setEscalationContact,
        startDateUTC,
        setStartDateUTC,
        submitDateUTC,
        setSubmitDateUTC,
        tags,
        setTags,
      }}
    >
      {children}
    </CustomerIntakeFormContext.Provider>
  )
}
export const useCustomerIntakeFormContext = () =>
  useContext(CustomerIntakeFormContext)
