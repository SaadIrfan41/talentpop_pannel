'use client'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  CustomerIntakeFormStep2Types,
  CustomerIntakeformStep2Schema,
} from './CustomerIntakeForm'
import { useCustomerIntakeFormContext } from '../../../context/CustomerIntakeFormContext'

const Step2 = () => {
  const [errorRef] = useAutoAnimate()
  const {
    setStepNumb,
    firstName,
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
  } = useCustomerIntakeFormContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep2Types>({
    resolver: zodResolver(CustomerIntakeformStep2Schema),
  })

  const submitData = async ({
    aboutBusiness,
    businessAddress,
    corporateName,
    email,
    lastName,
    phoneNumber,
  }: CustomerIntakeFormStep2Types) => {
    setAboutBusiness(aboutBusiness)
    setBusinessAddress(businessAddress)
    setCorporateName(corporateName)
    setEmail(email)
    setLastName(lastName)
    setPhoneNumber(phoneNumber)
    setStepNumb(2)
  }
  // const textareaRef = useRef(null)

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className={`mb-12 flex flex-col gap-y-5`}
    >
      <div ref={errorRef} className='flex flex-col gap-y-3'>
        <input
          defaultValue={lastName}
          autoComplete='off'
          type='text'
          {...register('lastName')}
          placeholder={`Awesome, ${firstName}, And Your Last Name?`}
          className={`form-button ${
            errors.lastName ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.lastName && (
          <span className='text-red-400'> {errors.lastName.message}</span>
        )}
      </div>

      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          defaultValue={email}
          type='email'
          {...register('email')}
          placeholder={`Great. Now What's The Best Email We Can Contact You At, ${firstName}?`}
          className={`form-button ${
            errors.email ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.email && (
          <span className='text-red-400'> {errors.email.message}</span>
        )}
      </div>
      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          defaultValue={phoneNumber}
          type='text'
          {...register('phoneNumber')}
          placeholder='And Your Personal Phone Number?'
          className={`form-button ${
            errors.phoneNumber ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.phoneNumber && (
          <span className='text-red-400'> {errors.phoneNumber.message}</span>
        )}
      </div>
      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          defaultValue={corporateName}
          type='text'
          {...register('corporateName')}
          placeholder='What Is The Corporate Name Of Your Business'
          className={`form-button ${
            errors.corporateName ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.corporateName && (
          <span className='text-red-400'> {errors.corporateName.message}</span>
        )}
      </div>
      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          defaultValue={businessAddress}
          type='text'
          {...register('businessAddress')}
          placeholder='What Is Your Business Address?'
          className={`form-button ${
            errors.businessAddress
              ? 'border-2 border-red-500  focus:ring-0'
              : ''
          }`}
        />
        {errors.businessAddress && (
          <span className='text-red-400'>
            {' '}
            {errors.businessAddress.message}
          </span>
        )}
      </div>
      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <textarea
          rows={7}
          defaultValue={aboutBusiness}
          {...register('aboutBusiness')}
          placeholder='Great, Can You Tell Us A Little Bit About Your Business?'
          className={` form-button ${
            errors.aboutBusiness ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.aboutBusiness && (
          <span className='text-red-400'> {errors.aboutBusiness.message}</span>
        )}
      </div>

      <div className=' flex w-full justify-between '>
        <button
          onClick={() => setStepNumb(0)}
          className='   form-submit-button'
        >
          Back
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className=' form-submit-button'
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default Step2
