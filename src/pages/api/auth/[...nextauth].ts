// import { prisma } from '@/lib/prisma'
// import { compare } from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../../lib/prisma'
import { compare, hash } from 'bcrypt'
import {
  Create_Account_Schema,
  RegisterUserTypes,
} from '@/app/api/signup/route'
import { User } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email_phone: {
          label: 'Email/PhoneNumber',
          type: 'text',
          placeholder: 'hello@example.com',
        },

        password: { label: 'Password', type: 'password' },
        // companyName: { label: 'Password', type: 'text' },
        // phoneNumber: { label: 'Password', type: 'text' },
        // companyEmail: { label: 'Password', type: 'text' },
        // dateOfBirth: { label: 'Password', type: 'text' },
        // companySize: { label: 'Password', type: 'number' },
      },
      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        if (credentials?.action === 'login')
          return loginUser(credentials?.email_phone, credentials?.password)
        //@ts-ignore
        if (credentials?.action === 'register')
          // console.log('CREDENTIALS', credentials)
          //@ts-ignore
          return registerUser(
            //@ts-ignore
            credentials?.companyName,
            //@ts-ignore
            credentials?.companyEmail,
            //@ts-ignore
            credentials?.password,
            //@ts-ignore
            credentials?.phoneNumber,
            //@ts-ignore
            credentials?.dateOfBirth,
            //@ts-ignore
            credentials?.companySize
          )
      },
    }),
  ],
  pages: {
    signIn: '/login',
    // signOut: '/login',
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phoneNumber: token.phoneNumber,
        },
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as User
        return {
          ...token,
          id: user.id,
          phoneNumber: u.phoneNumber,
        }
      }
      return token
    },
  },
}
export default NextAuth(authOptions)

const loginUser = async (email_phone: string, password: string) => {
  if (!email_phone || !password) {
    throw new Error('Invalid Credentials')
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ companyEmail: email_phone }, { phoneNumber: email_phone }],
      },
    })

    if (!user) {
      throw new Error('User Does Not Exist')
    }
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid Credentials')
    }
    console.log(user)
    return {
      id: user.id,
      email: user.companyEmail,
      name: user.companyName,
      phoneNumber: user.phoneNumber,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

const registerUser = async (
  companyName: string,
  companyEmail: string,
  password: string,
  phoneNumber: string,
  dateOfBirth: Date,
  companySize: string
) => {
  let user
  try {
    if (companyEmail !== 'undefined') {
      user = await prisma.user.findUnique({
        where: {
          companyEmail,
        },
      })
    }
    if (phoneNumber !== 'undefined') {
      user = await prisma.user.findUnique({
        where: {
          phoneNumber,
        },
      })
    }
    if (phoneNumber !== 'undefined' && companyName !== 'undefined') {
      user = await prisma.user.findFirst({
        where: {
          OR: [{ companyEmail: companyEmail }, { phoneNumber: phoneNumber }],
        },
      })
    }

    console.log(user)

    if (user) {
      throw new Error('This User Allready Exist')
    }
    console.log(
      companyName,
      companyEmail,
      password,
      phoneNumber,
      dateOfBirth,
      companySize
    )

    const cryptedPassword = await hash(password, 12)
    const newUser = await prisma.user.create({
      data: {
        companyEmail: companyEmail === 'undefined' ? null : companyEmail,
        phoneNumber: phoneNumber === 'undefined' ? null : phoneNumber,
        companyName: companyName,
        companySize: parseInt(companySize),
        dateOfBirth: new Date(dateOfBirth),
        password: cryptedPassword,
      },
    })
    return {
      id: newUser.id,
      email: newUser.companyEmail,
      name: newUser.companyName,
      phoneNumber: newUser.phoneNumber,
      // randomKey: 'Hey cool',
    }
    // const res = Create_Account_Schema.safeParse(companyName, companyEmail)
  } catch (error: any) {
    throw new Error(error)
  }
}
