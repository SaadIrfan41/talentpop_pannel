import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcrypt'
import { z, ZodType } from 'zod'
import { Prisma } from '@prisma/client'
// interface Body {
//   companyName: string
//   password: string
//   companyEmail?: string
//   companySize: number
//   phoneNumber?: string
//   dateOfBirth: Date | string
// }
export const Create_Account_Schema = z
  .object({
    companyName: z
      .string()
      .min(2, 'Company Name must contain at least 2 character(s)')
      .max(30, 'Company Name must contain at most 30 character(s)'),
    phoneNumber: z.string().trim().min(10).max(20).regex(/^\d+$/).optional(),
    password: z.string(),
    companySize: z.number(),
    dateOfBirth: z.string().pipe(z.coerce.date()),

    companyEmail: z
      .string()
      .email()
      .refine((email) => {
        if (email) return email.includes('@gmail.com')
      }, 'Can only use "@gmail.com" email')
      .optional(),
  })
  .refine((data) => data.companyEmail || data.phoneNumber, {
    message: 'Company Email or PhoneNumber is required',
  })
export type RegisterUserTypes = z.infer<typeof Create_Account_Schema>

export async function POST(request: NextRequest) {
  try {
    const res = Create_Account_Schema.safeParse(await request.json())
    if (!res.success) {
      const formatted = res.error.format()
      console.log(formatted)
      return NextResponse.json(
        {
          Error: formatted._errors,
          companyName: formatted.companyName?._errors,
          companyEmail: formatted.companyEmail?._errors,
          phoneNumber: formatted.phoneNumber?._errors,
          password: formatted.password?._errors,
          companySize: formatted.companySize?._errors,
          dateOfBirth: formatted.dateOfBirth?._errors,
        },
        { status: 400 }
      )
    }
    const {
      companyEmail,
      companyName,
      phoneNumber,
      password,
      companySize,
      dateOfBirth,
    } = res.data
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ companyEmail: companyEmail }, { phoneNumber: phoneNumber }],
      },
    })
    console.log(user)
    if (user) {
      return NextResponse.json(
        { message: 'This User Allready Exist' },
        { status: 400 }
      )
    }
    const cryptedPassword = await bcrypt.hash(password, 12)
    const newUser = await prisma.user.create({
      data: {
        companyEmail: companyEmail,
        phoneNumber: phoneNumber,
        companyName: companyName,
        companySize: companySize,
        dateOfBirth: dateOfBirth,
        password: cryptedPassword,
      },
    })
    return NextResponse.json({ newUser }, { status: 200 })

    // const
  } catch (e: any) {
    console.log('ERROR', e)
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (e.code === 'P2002') {
    //     console.log(
    //       'There is a unique constraint violation, a new user cannot be created with this email'
    //     )
    //   }
    // }
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}
