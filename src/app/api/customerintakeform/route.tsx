import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcrypt'
import { z, ZodType } from 'zod'
import { Prisma } from '@prisma/client'
import { headers, cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'

const CustomerIntakeformSchema = z.object({
  businessName: z.string().nonempty('Business name is required'),
  websiteURL: z.string().url().nonempty('Website URL is required'),
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  phoneNumber: z.string().nonempty('Phone number is required'),
  corporateName: z.string().nonempty('Corporate name is required'),
  businessAddress: z.string().nonempty('Business address is required'),
  aboutBusiness: z.string().nonempty('About business is required'),
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
  qaSheet: z.string().optional(),
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

const allowedFormats = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

type CustomerIntakeFormStep4Types = z.infer<typeof CustomerIntakeformSchema>

export async function POST(request: NextRequest) {
  //   console.log(await request.json())
  // console.log('HELLO World')
  // const res = await request.json()
  // console.log('BODY', await request.json())
  // return NextResponse.json(res, { status: 200 })
  try {
    const res = CustomerIntakeformSchema.safeParse(await request.json())
    console.log('SERVER RESPONSE', res)
    if (!res.success) {
      const formatted = res.error.format()
      console.log(formatted)
      return NextResponse.json(
        {
          Error: formatted._errors,
          businessName: formatted.businessName?._errors,

          firstName: formatted.firstName?._errors,

          websiteURL: formatted.websiteURL?._errors,

          lastName: formatted.lastName?._errors,

          email: formatted.email?._errors,

          phoneNumber: formatted.phoneNumber?._errors,

          corporateName: formatted.corporateName?._errors,

          businessAddress: formatted.businessAddress?._errors,

          aboutBusiness: formatted.aboutBusiness?._errors,

          tasks: formatted.tasks?._errors,

          inboundPhoneSupport: formatted.inboundPhoneSupport?._errors,

          customerServicePlatform: formatted.customerServicePlatform?._errors,

          platformName: formatted.platformName?._errors,

          ecommercePlatform: formatted.ecommercePlatform?._errors,

          qaSheetAvaliable: formatted.qaSheetAvaliable?._errors,

          qaSheet: formatted.qaSheet?._errors,

          numAgents: formatted.numAgents?._errors,

          agentWorkingHours: formatted.workingHours?._errors,

          agentWorkingDays: formatted.workingDays?._errors,

          genderPreference: formatted.genderPreference?._errors,

          agentStartUpDate: formatted.startUpDate?._errors,

          returnPolicy: formatted.returnPolicy?._errors,

          commonQuestions: formatted.commonQuestions?._errors,

          escalationContact: formatted.escalationContact?._errors,

          //   startDateUTC,
          //   setStartDateUTC,
          //   submitDateUTC,
          //   setSubmitDateUTC,
          //   tags,
          //   setTags,
        },
        { status: 400 }
      )
    }
    const {
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

      workingHours,

      workingDays,

      genderPreference,

      startUpDate,

      returnPolicy,

      commonQuestions,

      escalationContact,
    } = res.data
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })
    if (!session)
      return NextResponse.json(
        { message: 'UNAUTHORIZED USER' },
        { status: 401 }
      )
    console.log(session)
    const form = await prisma.customerIntakeForm.create({
      data: {
        businessName,
        userId: session?.sub as string,
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

        qaSheetUploaded: qaSheetAvaliable,

        qaSheet,

        numAgents,

        workingHours,

        workingDays,

        genderPreference,

        startUpDate,

        returnPolicy,

        commonQuestions,

        escalationContact,
      },
    })
    const updatedUser = await prisma.user.update({
      where: {
        id: session?.sub as string,
      },
      data: {
        intakeFormSubmited: true,
      },
    })
    return NextResponse.json(
      { formSubmited: updatedUser.intakeFormSubmited },
      { status: 200 }
    )
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

export async function GET(request: Request) {
  try {
    const session = await getToken({
      //@ts-ignore
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })

    const form = await prisma.customerIntakeForm.findUnique({
      where: {
        userId: session?.sub as string,
      },
    })

    return NextResponse.json(form, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}
