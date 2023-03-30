'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  CustomerIntakeFormStep1Types,
  CustomerIntakeformStep1Schema,
} from './CustomerIntakeForm'
import { useCustomerIntakeFormContext } from '../../../context/CustomerIntakeFormContext'

const Step1 = () => {
  const [errorRef] = useAutoAnimate()
  const {
    setStepNumb,
    businessName,
    setBusinessName,
    firstName,
    setFirstName,
    websiteURL,
    setWebsiteURL,
  } = useCustomerIntakeFormContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep1Types>({
    resolver: zodResolver(CustomerIntakeformStep1Schema),
  })

  const submitData = async ({
    businessName,
    firstName,
    websiteURL,
  }: CustomerIntakeFormStep1Types) => {
    setBusinessName(businessName)
    setFirstName(firstName)
    setWebsiteURL(websiteURL)
    setStepNumb(1)
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className={`flex flex-col gap-y-5`}
    >
      <div ref={errorRef} className='flex flex-col gap-y-3'>
        <input
          defaultValue={businessName}
          autoComplete='off'
          type='text'
          {...register('businessName')}
          placeholder='What Is The Name Of Your Business?'
          className={`form-button ${
            errors.businessName ? 'border-2 border-red-500 focus:ring-0' : ''
          }`}
        />
        {errors.businessName && (
          <span className='text-red-400'> {errors.businessName.message}</span>
        )}
      </div>

      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          type='url'
          defaultValue={websiteURL}
          {...register('websiteURL')}
          placeholder='What Is Your Website URL?'
          className={`form-button ${
            errors.websiteURL ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.websiteURL && (
          <span className='text-red-400'> {errors.websiteURL.message}</span>
        )}
      </div>
      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          type='text'
          defaultValue={firstName}
          {...register('firstName')}
          placeholder='What About Your First Name?'
          className={`form-button ${
            errors.firstName ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.firstName && (
          <span className='text-red-400'> {errors.firstName.message}</span>
        )}
      </div>

      <div className=' flex w-full justify-end'>
        <button
          type='submit'
          disabled={isSubmitting}
          className=' form-submit-button '
        >
          Next
          {/* {isSubmitting ? (
          <div role='status' className='flex items-center gap-x-2'>
            <span className='w-full animate-pulse text-center'>
              Logging In ...
            </span>
          </div>
        ) : (
          ' Log In'
        )} */}
        </button>
      </div>
    </form>
  )
}

export default Step1
