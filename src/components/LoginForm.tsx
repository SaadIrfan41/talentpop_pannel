'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, SignInResponse } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const schema = z.object({
  emailORphone: z.union([
    z
      .string()
      .email({ message: 'Invalid Email / Phone Number' })
      .refine((email) => {
        if (email) return email.includes('@gmail.com')
      }, 'Can only use "@gmail.com" email')
      .optional(),

    z
      .string()
      .min(8, 'Phone Number must contain at least 8 digits')
      .max(20, 'Phone Number must contain at most 30 digits')
      .regex(/^\d+$/)

      .optional(),
  ]),
  password: z
    .string()
    .min(7, 'Password must contain at least 7 character(s)')
    .max(30, 'Password must contain at most 30 character(s)'),
})

export type FormData = z.infer<typeof schema>

const LoginForm = () => {
  const [errorRef] = useAutoAnimate()
  // easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string

  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const submitData = async (data: FormData) => {
    try {
      const res: SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        email_phone: data.emailORphone,
        password: data.password,
        action: 'login',
      })
      if (res?.error) {
        return toast.error(res.error)
      }
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
    <form
      onSubmit={handleSubmit(submitData)}
      className={`flex flex-col gap-y-5`}
    >
      <div ref={errorRef} className='flex flex-col gap-y-3'>
        <input
          autoComplete='off'
          type='text'
          {...register('emailORphone')}
          placeholder='Phone number, email address'
          className={` w-96 rounded-lg border  border-[#BECDCC] pt-3   pb-4 pl-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
            errors.emailORphone ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.emailORphone && (
          <span className='text-red-400'> {errors.emailORphone.message}</span>
        )}
      </div>

      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          type='password'
          {...register('password')}
          placeholder='Password'
          className={`w-96 rounded-lg border  border-[#BECDCC] pt-3   pb-4 pl-4 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
            errors.password ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.password && (
          <span className='text-red-400'> {errors.password.message}</span>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='  rounded-full bg-[#69C920] bg-opacity-75 py-3 px-8 text-lg font-bold text-white shadow-md outline-none disabled:cursor-no-drop'
      >
        {isSubmitting ? (
          <div role='status' className='flex items-center gap-x-2'>
            <span className='w-full animate-pulse text-center'>
              Logging In ...
            </span>
          </div>
        ) : (
          ' Log In'
        )}
      </button>
    </form>
  )
}

export default LoginForm
