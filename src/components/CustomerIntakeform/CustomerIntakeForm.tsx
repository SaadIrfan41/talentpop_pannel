'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Step1 from './Step1'
import Step2 from './Step2'
import { useCustomerIntakeFormContext } from '../../../context/CustomerIntakeFormContext'
import Step3 from './Step3'
import Step4 from './Step4'
export const CustomerIntakeformStep1Schema = z.object({
  businessName: z.string().nonempty('Business name is required'),
  websiteURL: z.string().url().nonempty('Website URL is required'),
  firstName: z.string().nonempty('First name is required'),
})
export const CustomerIntakeformStep2Schema = z.object({
  lastName: z.string().nonempty('Last name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  phoneNumber: z.string().nonempty('Phone number is required'),
  corporateName: z.string().nonempty('Corporate name is required'),
  businessAddress: z.string().nonempty('Business address is required'),
  aboutBusiness: z.string().nonempty('About business is required'),
})

const allowedFormats = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const CustomerIntakeformStep3Schema = z.object({
  tasks: z
    .array(z.string(), {
      required_error: 'Select atleast one task',
      invalid_type_error: 'Tasks are required',
    })
    .nonempty('Tasks are required'),
  inboundPhoneSupport: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required',
  }),
  customerServicePlatform: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required',
  }),
  platformName: z.string().optional(),
  ecommercePlatform: z.string().nonempty('This Field is required'),
  qaSheetAvaliable: z.string({
    required_error: 'This Field is required',
    invalid_type_error: 'This Field is required',
  }),
  qaSheet: z
    .any()
    .refine(
      (file) => {
        if (file?.length !== 0) {
          return file?.[0]?.size <= 1000000
        }
        return true
      },
      { message: 'Max file size is 1MB.' }
    )
    .refine(
      (file) => {
        if (file?.length !== 0) {
          return allowedFormats.includes(file?.[0]?.type)
        }
        return true
      },
      { message: 'Only PDF and DOC Files Allowed' }
    )
    .optional(),
})

export const CustomerIntakeformStep4Schema = z.object({
  numAgents: z
    .number({
      invalid_type_error: 'This Field is required',
      required_error: 'This Field is required',
    })
    .min(1),
  workingDays: z
    .number({
      invalid_type_error: 'This Field is required',
      required_error: 'This Field is required',
    })
    .min(1, { message: 'Invalid days' })
    .max(7, { message: 'Invalid days' }),
  workingHours: z
    .number({
      invalid_type_error: 'This Field is required',
      required_error: 'This Field is required',
    })
    .min(1, { message: 'Invalid hours' })
    .max(24, { message: 'Invalid hours' }),
  // agentWorkingTime: z.string().nonempty(),
  genderPreference: z.string().nonempty('Select One Option'),
  startUpDate: z.string().pipe(z.coerce.date()),
  returnPolicy: z.string().nonempty('This Field is required'),
  commonQuestions: z
    .array(z.string(), {
      required_error: 'Add atleast one Question',
      invalid_type_error: 'Invalid Question Type',
    })
    .min(1, { message: 'Need Atleast One Question' })
    .max(5, { message: '5 Question Max reached' })
    .nonempty('Atleast One Question is required'),
  escalationContact: z.string().nonempty('This Field is required'),
  // startDateUTC: z.string().pipe(z.coerce.date()),
  // submitDateUTC: z.string().pipe(z.coerce.date()),
  // tags: z.array(z.string()).optional(),
})

export type CustomerIntakeFormStep1Types = z.infer<
  typeof CustomerIntakeformStep1Schema
>
export type CustomerIntakeFormStep2Types = z.infer<
  typeof CustomerIntakeformStep2Schema
>
export type CustomerIntakeFormStep3Types = z.infer<
  typeof CustomerIntakeformStep3Schema
>
export type CustomerIntakeFormStep4Types = z.infer<
  typeof CustomerIntakeformStep4Schema
>

const CustomerIntakeForm = () => {
  const [errorRef] = useAutoAnimate()
  const { stepNumb } = useCustomerIntakeFormContext()

  return (
    <div className=' mx-auto mt-20 max-w-7xl '>
      <h1 className=' mb-9 text-3xl font-bold'>Customer Intake Form</h1>
      {stepNumb === 0 ? (
        <Step1 />
      ) : stepNumb === 1 ? (
        <Step2 />
      ) : stepNumb === 2 ? (
        <Step3 />
      ) : (
        <Step4 />
      )}
      {/* {stepNumb === 0 ? <Step1 /> : stepNumb === 1 ? <Step4 /> : ''} */}
      {/* <Step3 /> */}
    </div>
  )
}

export default CustomerIntakeForm
