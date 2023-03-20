'use client'
import React, { useState } from 'react'
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, SignInResponse } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Create_Account_Schema = z
  .object({
    companyName: z
      .string()
      .min(2, 'Company Name must contain at least 2 character(s)')
      .max(30, 'Company Name must contain at most 30 character(s)'),
    phoneNumber: z.preprocess((number) => {
      if (!number || typeof number !== 'string') return undefined
      return number === '' ? undefined : number
    }, z.string().trim().min(10).max(20).regex(/^\d+$/, { message: 'Invalid Number' }).optional()),
    password: z.string(),
    companySize: z.number().gt(0, { message: 'Company Size is required' }),
    dateOfBirth: z.string().pipe(z.coerce.date()),

    companyEmail: z.preprocess(
      (email) => {
        if (!email || typeof email !== 'string') return undefined
        return email === '' ? undefined : email
      },
      z
        .string()
        .email()

        .refine((email) => {
          if (email) return email.includes('@gmail.com')
        }, 'Can only use "@gmail.com" email')
        .optional()
    ),
  })
  .refine((data) => data.companyEmail || data.phoneNumber, {
    message: 'Company Email or PhoneNumber is required',
    path: ['refine'],
  })
type RegisterUserTypes = z.infer<typeof Create_Account_Schema>

const CreateAccount = () => {
  const [showEmail, setshowEmail] = useState(false)
  const [showPassword, setshowPassword] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserTypes>({
    resolver: zodResolver(Create_Account_Schema),
  })

  const submitData = async (data: RegisterUserTypes) => {
    console.log(data)

    try {
      const res: SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        password: data.password,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        companySize: data.companySize,
        action: 'register',
      })
      console.log('Response', res)
      if (res?.error) {
        return toast.error(res.error)
      }
      toast.success('Account created Successfull')
      console.log(res)

      reset()
      console.log('BASE URL', process.env.NEXT_PUBLIC_BASE_URL)
      if (process.env.NEXT_PUBLIC_BASE_URL) {
        router.push(process.env.NEXT_PUBLIC_BASE_URL)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' mx-auto mt-20 max-w-3xl'>
      <p className=' mb-10 text-3xl font-bold text-[#69C920]'>
        Create an account
      </p>

      <form
        //   ref={formRef}
        onSubmit={handleSubmit(submitData)}
        className={` flex flex-col gap-y-6 `}
      >
        {/* Company Name */}
        <input
          type='text'
          {...register('companyName')}
          placeholder='Company Name'
          className={`  rounded-lg border  border-[#BECDCC] pt-3   pb-4 pl-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
            errors.companyName ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.companyName && (
          <span className='text-red-400'> {errors.companyName.message}</span>
        )}
        {/* Phone Number */}
        <div>
          <input
            // autoComplete='off'

            type='text'
            {...register('phoneNumber', { required: false })}
            placeholder='Phone number'
            className={` w-full  rounded-lg border  border-[#BECDCC] pt-3   pb-4 pl-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
              errors.phoneNumber ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.phoneNumber && (
            <span className='text-red-400'> {errors.phoneNumber.message}</span>
          )}
        </div>
        <span
          onClick={() => {
            setshowEmail(!showEmail), resetField('companyEmail')
          }}
          className=' cursor-pointer text-lg font-normal text-[#69C920]'
        >
          Use email
        </span>

        {/* Email */}
        {showEmail && (
          <div>
            <input
              // autoComplete='off'

              type='email'
              {...register('companyEmail', { required: false })}
              placeholder='Company Email'
              className={` w-full rounded-lg border  border-[#BECDCC] pt-3   pb-4 pl-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
                errors.companyEmail ? 'border-2 border-red-500' : ''
              }`}
            />
            {errors.companyEmail && (
              <span className='text-red-400'>
                {' '}
                {errors.companyEmail.message}
              </span>
            )}
          </div>
        )}
        {/* Password */}
        <div className='relative'>
          <input
            // autoComplete='off'

            type={showPassword == true ? 'text' : 'password'}
            {...register('password')}
            placeholder='Phone number, email address'
            className={`  w-full rounded-lg border  border-[#BECDCC] pt-3   pb-4 pl-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
              errors.password ? 'border-2 border-red-500' : ''
            }`}
          />
          {errors.password && (
            <span className='text-red-400'> {errors.password.message}</span>
          )}
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5'>
            {showPassword ? (
              <svg
                onClick={() => setshowPassword(false)}
                className='h-6 text-[#778180]'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 640 512'
              >
                <path
                  fill='currentColor'
                  d='M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z'
                ></path>
              </svg>
            ) : (
              <svg
                onClick={() => setshowPassword(true)}
                className='h-6 text-[#778180]'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
              >
                <path
                  fill='currentColor'
                  d='M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z'
                ></path>
              </svg>
            )}
          </div>
        </div>
        {/* Company Size */}
        <div className=' select-wrapper'>
          <select
            {...register('companySize', { valueAsNumber: true })}
            className={` relative z-0 w-full rounded-lg border border-[#BECDCC] pr-3 pt-3  pb-4 pl-4   outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
              errors.companySize ? 'border-2 border-red-500' : ''
            }`}
          >
            <option className='mt-5' value={0}>
              Company Size
            </option>
            <option value={1000} label='0-1000 employees' />
            <option value={2000} label='1000-2000 employees' />
            <option value={3000} label='2000-3000 employees' />
            <option value={4000} label='3000-4000 employees' />
            <option value={5000} label='4000-5000 employees' />
          </select>
          {errors.companySize && (
            <span className='text-red-400'> {errors.companySize.message}</span>
          )}
        </div>
        {/* Date Of Birth */}
        <input
          // autoComplete='off'

          type='date'
          {...register('dateOfBirth')}
          placeholder='Phone number, email address'
          className={` rounded-lg border border-[#BECDCC]   pt-3   pb-4 pl-4 pr-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
            errors.dateOfBirth ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.dateOfBirth && (
          <span className='text-red-400'> {errors.dateOfBirth.message}</span>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='  rounded-full bg-[#69C920] bg-opacity-75 py-3 px-8 text-lg font-bold text-white shadow-md outline-none disabled:cursor-no-drop'
        >
          {isSubmitting ? (
            <div role='status' className='flex items-center gap-x-2'>
              <span className='w-full animate-pulse text-center'>
                Loading ...
              </span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {
        //@ts-ignore
        errors?.refine && (
          <p className='mt-5  w-full rounded-lg  bg-red-500  pt-3  pb-4 pl-4 text-lg font-normal text-white outline-none'>
            {
              //@ts-ignore
              errors.refine?.message
            }
          </p>
        )
      }
    </div>
  )
}

export default CreateAccount
