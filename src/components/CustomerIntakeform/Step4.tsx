'use client'
import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  CustomerIntakeFormStep4Types,
  CustomerIntakeformStep4Schema,
} from './CustomerIntakeForm'
import { useCustomerIntakeFormContext } from '../../../context/CustomerIntakeFormContext'
import { XIcon } from '@/components/Icons'
import axios from 'axios'
import { useStepperContextContext } from '../../../context/StepperContext'

const Step4 = () => {
  const [animationRef] = useAutoAnimate()

  const {
    stepNumb,
    setStepNumb,
    businessName,

    firstName,

    websiteURL,

    lastName,

    email,

    phoneNumber,

    corporateName,

    businessAddress,

    aboutBusiness,

    tasks,

    inboundPhoneSupport,

    customerServicePlatform,

    platformName,

    ecommercePlatform,

    qaSheetAvaliable,

    qaSheet,

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
    // startDateUTC,
    // setStartDateUTC,
    // submitDateUTC,
    // setSubmitDateUTC,
    // tags,
    // setTags,
  } = useCustomerIntakeFormContext()

  const dateStr = agentStartUpDate

  const date = new Date(dateStr)

  const formattedDate = date.toISOString().split('T')[0]
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep4Types>({
    defaultValues: {
      commonQuestions: commonQuestions,
      genderPreference: genderPreference,
      //@ts-ignore
      // startUpDate: new Intl.DateTimeFormat(undefined).format(agentStartUpDate),
      startUpDate: formattedDate,
      numAgents: numAgents,
      returnPolicy: returnPolicy,
      workingDays: agentWorkingDays,
      workingHours: agentWorkingHours,
      escalationContact: escalationContact,
    },
    resolver: zodResolver(CustomerIntakeformStep4Schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-ignore
    name: 'commonQuestions',
    rules: {
      required: 'This field is required',
    },
  })
  const { stepperStep, setstepperStep } = useStepperContextContext()

  const SubmitData = async (data: CustomerIntakeFormStep4Types) => {
    setNumAgents(data.numAgents),
      setGenderPreference(data.genderPreference),
      setAgentStartUpDate(data.startUpDate),
      setReturnPolicy(data.returnPolicy),
      setCommonQuestions(data.commonQuestions),
      setAgentWorkingDays(data.workingDays)
    setAgentWorkingHours(data.workingHours)
    setCommonQuestions(data.commonQuestions)
    setEscalationContact(data.escalationContact)
    const body = {
      businessName: businessName,

      firstName: firstName,

      websiteURL: websiteURL,

      lastName: lastName,

      email: email,

      phoneNumber: phoneNumber,

      corporateName: corporateName,

      businessAddress: businessAddress,

      aboutBusiness: aboutBusiness,

      tasks: tasks,

      inboundPhoneSupport: inboundPhoneSupport,

      customerServicePlatform: customerServicePlatform,

      platformName: platformName,

      ecommercePlatform: ecommercePlatform,

      qaSheetAvaliable: qaSheetAvaliable,

      qaSheet: '',

      numAgents: numAgents || data.numAgents,

      workingHours: agentWorkingHours || data.workingHours,

      workingDays: agentWorkingDays || data.workingDays,

      genderPreference: genderPreference || data.genderPreference,

      startUpDate: agentStartUpDate || data.startUpDate,

      returnPolicy: returnPolicy || data.returnPolicy,

      commonQuestions: data.commonQuestions || commonQuestions,

      escalationContact: escalationContact || data.escalationContact,
    }

    // console.log(body)
    if (body.qaSheetAvaliable === 'Yes') {
      const file = qaSheet[0]

      const fileType = qaSheet[0]?.type

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3Upload?fileType=${fileType}`
      )

      const { uploadUrl, key } = data
      await axios.put(uploadUrl, file)
      // console.log('ObjectURL', `https://talentpop.s3.amazonaws.com/${key}`)
      body.qaSheet = `${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/${key}`
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customerintakeform`,
      body
    )

    // console.log(res.data)
    setstepperStep(2)
    console.log(stepperStep)
  }

  return (
    <form
      onSubmit={handleSubmit(SubmitData)}
      className={`mb-12 flex flex-col gap-y-5`}
    >
      <div ref={animationRef} className='flex flex-col gap-y-3'>
        <div>
          <input
            defaultValue={numAgents}
            autoComplete='off'
            type='number'
            {...register('numAgents', { valueAsNumber: true })}
            placeholder={`How Many Customer Service Agents Are You Looking To Add To Your Team?`}
            className={`form-button ${
              errors.numAgents ? 'border-2 border-red-500  focus:ring-0' : ''
            }`}
          />

          <span className=' text-lg text-gray-600'>
            Note: You can request more agents in the future
          </span>
        </div>
        {errors.numAgents && (
          <span className='text-red-400'> {errors.numAgents.message}</span>
        )}
      </div>
      <div ref={animationRef} className='flex flex-col gap-y-3'>
        <div className='flex flex-col'>
          <p className={` pt-5 pb-1 text-xl font-medium text-opacity-50  `}>
            What Hours Would You Like Your Dedicated Agent To Be Working?
          </p>
          <span className=' text-lg text-gray-600'>
            E.g (5 days, 8 hours per day)
          </span>
        </div>

        <div className=' flex gap-x-5'>
          <input
            // defaultValue={agentWorkingDays}
            placeholder='Days'
            className={` ${
              errors.workingDays
                ? 'border-2 border-red-500  focus:ring-0'
                : 'focus:ring-2 focus:ring-[#69C920]'
            } max-w-[6.25rem] rounded-lg border border-[#BECDCC] px-4 pt-5 pb-5 text-lg font-medium text-opacity-60 outline-none transition-all duration-300 placeholder:text-lg placeholder:font-medium placeholder:text-[#000000] placeholder:text-opacity-60 `}
            {...register('workingDays', { valueAsNumber: true })}
            type='number'
            // min={1}
            // max={7}
          />

          <input
            placeholder='Hours'
            // defaultValue={agentWorkingHours}
            className={` ${
              errors.workingHours
                ? 'border-2 border-red-500  focus:ring-0'
                : 'focus:ring-2 focus:ring-[#69C920] '
            } max-w-[6.25rem] rounded-lg border border-[#BECDCC] px-4 pt-5 pb-5 text-lg font-medium text-opacity-60 outline-none transition-all duration-300 placeholder:text-lg placeholder:font-medium placeholder:text-[#000000] placeholder:text-opacity-60 `}
            {...register('workingHours', { valueAsNumber: true })}
            type='number'
            // min='1'
            // max='24'
          />
        </div>
      </div>
      {errors.workingDays ? (
        <span className=' text-red-400 '>{errors.workingDays.message}</span>
      ) : (
        errors.workingHours && (
          <span className=' text-red-400 '>{errors.workingHours.message}</span>
        )
      )}
      <div ref={animationRef} className=''>
        <select
          //   defaultValue={genderPreference}
          {...register('genderPreference')}
          className={`form-button ${
            errors.genderPreference
              ? 'border-2 border-red-500  focus:ring-0'
              : ''
          }`}
        >
          <option value={''}>--- Gender Preference ---</option>
          <option value={'No'} label='No' />
          <option value={'Male'} label='Male' />
          <option value={'Female'} label='Female' />
          <option value={'Others'} label='Others' />
        </select>
        {errors.genderPreference && (
          <span className='text-red-400'>
            {' '}
            {errors.genderPreference.message}
          </span>
        )}
      </div>
      <div ref={animationRef}>
        <p className={` pt-5 pb-5  text-xl font-medium text-opacity-50  `}>
          When Would You Like Your Agent(s) Up And Running?
        </p>

        <input
          type='date'
          {...register('startUpDate')}
          placeholder='When Would You Like Your Agent(s) Up And Running?'
          className={`form-button pr-3 ${
            errors.startUpDate ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.startUpDate && (
          <span className='text-red-400'> {errors.startUpDate.message}</span>
        )}
      </div>
      <div ref={animationRef} className='flex flex-col gap-y-2'>
        <textarea
          rows={3}
          defaultValue={returnPolicy}
          {...register('returnPolicy')}
          placeholder='Can You Share Some Information On Your Return/Refund/Exchange Policy?'
          className={` form-button ${
            errors.returnPolicy ? 'border-2 border-red-500  focus:ring-0' : ''
          }`}
        />
        {errors.returnPolicy && (
          <span className='text-red-400'> {errors.returnPolicy.message}</span>
        )}
      </div>
      <div ref={animationRef} className='flex flex-col gap-2'>
        <h5
          className={` pt-5 text-xl font-medium text-opacity-50   ${
            errors.commonQuestions ? '  ' : ''
          }`}
        >
          What Are The 5 Most Common Questions Customers Ask? Around What % Are
          These Questions In Comparison To The Total Customer Service Questions
          That Come In?
        </h5>

        {errors.commonQuestions && (
          <span className='text-red-400'>
            {' '}
            {errors.commonQuestions.message}
          </span>
        )}
      </div>
      <div
        ref={animationRef}
        className=' flex flex-col items-start justify-center gap-y-5'
      >
        {fields.map((field, index) => (
          <div key={field.id} className='flex items-center gap-x-3'>
            <label
              className='text-xl font-medium'
              htmlFor={`commonQuestions[${index}]`}
            >
              Q{index + 1}:
            </label>
            <input
              required
              className='  min-w-[700px] rounded-lg border border-[#BECDCC] pt-2 pb-2 pl-4 pr-4 text-lg font-medium text-opacity-60 outline-none transition-all duration-300 placeholder:text-lg placeholder:font-medium placeholder:text-[#000000] placeholder:text-opacity-60 focus:ring-2 focus:ring-[#69C920]'
              //@ts-ignore
              {...register(`commonQuestions[${index}]`, {
                required: 'THIS FIELD IS REQUIRED',
              })}
              type='text'
              placeholder={'Enter you Question'}
            />

            <button type='button' onClick={() => remove(index)}>
              <XIcon className=' h-7 w-7 ' />
            </button>
          </div>
        ))}
        <button
          type='button'
          className=' text-md max-w-fit rounded-xl bg-[#69C920] bg-opacity-75 py-4 px-4 font-bold text-white shadow-md outline-none disabled:cursor-no-drop'
          onClick={() => append(null)}
        >
          Add Question
        </button>
      </div>
      <div ref={animationRef} className='flex flex-col gap-y-2'>
        <input
          type='text'
          defaultValue={escalationContact}
          {...register('escalationContact')}
          placeholder='Who Is The Best Point Of Contact To Share Updates With/Escalate Tier 2 Support Tickets To?'
          className={` form-button ${
            errors.escalationContact
              ? 'border-2 border-red-500  focus:ring-0'
              : ''
          }`}
        />
        {errors.escalationContact && (
          <span className='text-red-400'>
            {' '}
            {errors.escalationContact.message}
          </span>
        )}
      </div>

      <div className=' flex w-full justify-between '>
        <button
          onClick={() => setStepNumb(2)}
          className='   form-submit-button'
        >
          Back
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className=' form-submit-button'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default Step4
