'use client'
import React, { useRef, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  CustomerIntakeFormStep3Types,
  CustomerIntakeformStep3Schema,
} from './CustomerIntakeForm'
import { useCustomerIntakeFormContext } from '../../../context/CustomerIntakeFormContext'
import { MultiSelect } from 'react-multi-select-component'
import axios from 'axios'

const Step3 = () => {
  const [showCustomerServicePlatform, setshowCustomerServicePlatform] =
    useState(false)
  const [show_QA_SheetAvaliable, setshow_QA_SheetAvaliable] = useState(false)

  const [errorRef] = useAutoAnimate()
  const {
    setStepNumb,
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
  } = useCustomerIntakeFormContext()

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<CustomerIntakeFormStep3Types>({
    resolver: zodResolver(CustomerIntakeformStep3Schema),
  })
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'tasks',
  // })

  const submitData = async ({
    tasks,
    inboundPhoneSupport,

    customerServicePlatform,

    platformName,

    ecommercePlatform,

    qaSheet,
    qaSheetAvaliable,
  }: CustomerIntakeFormStep3Types) => {
    setTasks(tasks),
      setInboundPhoneSupport(inboundPhoneSupport),
      setCustomerServicePlatform(customerServicePlatform),
      setPlatformName(platformName ? platformName : 'No'),
      setEcommercePlatform(ecommercePlatform),
      setqaSheetAvaliable(qaSheetAvaliable)
    setQaSheet(qaSheetAvaliable === 'Yes' ? qaSheet : 'Not Avaliable'),
      // console.log(
      //   tasks,
      //   inboundPhoneSupport,

      //   customerServicePlatform,

      //   platformName,

      //   ecommercePlatform,

      //   qaSheet
      // )
      // const body = new FormData()
      // if (qaSheetAvaliable === 'Yes') {
      //   body.append('qaSheet', qaSheet[0])
      //   const file = body.get('qaSheet')
      //   // @ts-ignore
      //   const fileType = body.get('qaSheet').type
      //   console.log(fileType)
      //   const { data } = await axios.get(
      //     `http://localhost:3000/api/s3Upload?fileType=${fileType}`
      //   )

      //   const { uploadUrl, key } = data
      //   await axios.put(uploadUrl, file)
      //   console.log('ObjectURL', `https://talentpop.s3.amazonaws.com/${key}`)
      // } else {
      //   body.append('qaSheet', '')
      // }

      setStepNumb(3)
  }

  const tasksArray = [
    'Email',
    'Live Chat',
    'SMS',
    "Social Media Comments/DM's",
    'Data Entry',
    'Influencer Outreach',
    'Other',
  ]

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className={`mb-12 flex flex-col gap-y-5`}
    >
      <div ref={errorRef} className='flex flex-col gap-y-3'>
        <h1
          // className={`form-button text-lg opacity-50 ${
          //   errors.tasks ? 'border-2 border-red-500 focus:ring-0' : ''
          // }`}
          className=' w-full pl-4 text-xl font-normal'
        >
          What Types of Tasks Will Your Agent Be Working On Day To Day?
        </h1>
        {errors.tasks && (
          <span className='pl-4 text-red-400'>{errors.tasks.message}</span>
        )}
      </div>
      {tasksArray.map((task, index) => (
        <div
          className='text-md flex w-full items-center gap-x-3 rounded-lg   pl-6 font-normal text-[##BECDCC] outline-none transition-all duration-300'
          key={index}
        >
          <input
            defaultChecked={tasks[index] === task}
            // checked={tasks[index] === task}
            className='h-4 w-4 rounded-3xl  '
            {...register('tasks')}
            type='checkbox'
            value={task}
          />
          <label>{task}</label>
        </div>
      ))}

      <div ref={errorRef} className='flex flex-col gap-y-3'>
        <h1 className=' w-full pl-4 text-xl font-normal'>
          Do You Require Your Agent To Handle Inbound Phone Call Support?
          <br />
          <span className=' text-lg text-gray-600'>
            (Please note that agents handling phone support are an additional $1
            an hour)
          </span>
        </h1>
        {errors.inboundPhoneSupport && (
          <span className='pl-4 text-red-400 '>
            {errors.inboundPhoneSupport.message}
          </span>
        )}
      </div>
      <div className='text-md flex w-full items-center gap-x-3 rounded-lg   pl-4 font-normal outline-none transition-all duration-300'>
        <input
          defaultChecked={inboundPhoneSupport === 'Yes'}
          className='h-4 w-4 rounded-3xl  '
          {...register('inboundPhoneSupport')}
          type='radio'
          value='Yes'
        />
        <label>{'Yes'}</label>
        <input
          className='h-4 w-4 rounded-3xl  '
          {...register('inboundPhoneSupport')}
          type='radio'
          value='No'
          defaultChecked={inboundPhoneSupport === 'No'}
        />
        <label>{'No'}</label>
      </div>

      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <h1 className=' w-full pl-4 text-xl font-normal'>
          Do You Have A Customer Service Platform In Place Already?
        </h1>
        {errors.customerServicePlatform && (
          <span className='pl-4 text-red-400 '>
            {errors.customerServicePlatform.message}
          </span>
        )}
      </div>
      <div className='text-md flex w-full items-center gap-x-3 rounded-lg   pl-4 font-normal text-[##BECDCC] outline-none transition-all duration-300'>
        <input
          className='h-4 w-4 rounded-3xl  '
          {...register('customerServicePlatform')}
          type='radio'
          value='Yes'
          defaultChecked={customerServicePlatform === 'Yes'}
          onClick={() => {
            setshowCustomerServicePlatform(true)
          }}
        />
        <label>{'Yes'}</label>
        <input
          className='h-4 w-4 rounded-3xl  '
          {...register('customerServicePlatform')}
          type='radio'
          value='No'
          defaultChecked={customerServicePlatform === 'No'}
          onClick={() => {
            setshowCustomerServicePlatform(false), resetField('platformName')
          }}
        />
        <label>{'No'}</label>
      </div>

      <div ref={errorRef} className=' flex flex-col gap-y-2'>
        {(showCustomerServicePlatform || customerServicePlatform === 'Yes') && (
          <div>
            <input
              defaultValue={platformName}
              type='text'
              {...register('platformName', { required: false })}
              placeholder='Customer Service Platform Name'
              className={` form-button ${
                errors.platformName
                  ? 'border-2 border-red-500 focus:ring-0'
                  : ''
              }`}
            />
            {errors.platformName && (
              <span className='text-red-400'>
                {' '}
                {errors.platformName.message}
              </span>
            )}
          </div>
        )}
      </div>

      <div ref={errorRef} className=' flex flex-col gap-y-2 pl-1'>
        <div>
          <input
            type='text'
            defaultValue={ecommercePlatform}
            {...register('ecommercePlatform', { required: false })}
            placeholder='What E-Commerce Platform Does Your Virtual Assistant Need Access To?'
            className={` form-button ${
              errors.ecommercePlatform
                ? 'border-2 border-red-500 focus:ring-0 '
                : ''
            }`}
          />
          {errors.ecommercePlatform && (
            <span className='text-red-400'>
              {errors.ecommercePlatform.message}
            </span>
          )}
        </div>
      </div>

      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <h1 className=' w-full pl-4 text-xl font-normal'>
          Do You Have A Question/Answer Sheet Created Yet For Your Most Common
          Questions Created Yet?
        </h1>
        {errors.qaSheetAvaliable && (
          <span className='pl-4 text-red-400 '>
            {errors.qaSheetAvaliable.message}
          </span>
        )}
      </div>

      <div className='text-md flex w-full items-center gap-x-3 rounded-lg   pl-4 font-normal text-[##BECDCC] outline-none transition-all duration-300'>
        <input
          className='h-4 w-4 rounded-3xl  '
          {...register('qaSheetAvaliable')}
          defaultChecked={qaSheetAvaliable === 'Yes'}
          type='radio'
          value='Yes'
          onClick={() => {
            setshow_QA_SheetAvaliable(true)
          }}
        />
        <label>{'Yes'}</label>
        <input
          className='h-4 w-4 rounded-3xl  '
          {...register('qaSheetAvaliable')}
          type='radio'
          value='No'
          defaultChecked={qaSheetAvaliable === 'No'}
          onClick={() => {
            setshow_QA_SheetAvaliable(false), resetField('qaSheet')
          }}
        />
        <label>{'No'}</label>
      </div>

      <div ref={errorRef} className=' flex flex-col gap-y-2'>
        {show_QA_SheetAvaliable && (
          <div ref={errorRef} className='flex flex-col gap-y-2'>
            <div>
              <h1 className=' w-full pl-4 text-xl font-normal'>
                Great! Can You Upload It Here For Our Team To Review And Format
                For Your Virtual Assistant?
              </h1>
              {errors.qaSheetAvaliable && (
                <span className='pl-4 text-red-400 '>
                  {errors.qaSheetAvaliable.message}
                </span>
              )}
            </div>
            <input
              type='file'
              accept='.pdf,.doc,.docx'
              // defaultValue={qaSheet}
              {...register('qaSheet')}
              placeholder='Great, Can You Tell Us A Little Bit About Your Business?'
              className='block w-full text-sm text-slate-500
      file:mr-4 file:rounded-full file:border-0
      file:bg-green-50 file:py-2
      file:px-4 file:text-sm
      file:font-semibold file:text-green-700
      hover:file:bg-green-100'
            />
            {errors.qaSheet && (
              //@ts-ignore
              <span className='text-red-400'>{errors.qaSheet?.message}</span>
            )}
          </div>
        )}
      </div>

      <div className=' flex w-full justify-between '>
        <button
          onClick={() => setStepNumb(1)}
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

export default Step3
