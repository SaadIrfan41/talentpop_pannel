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
  // adapter: PrismaAdapter(prisma),
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
    async session({ session, token }) {
      console.log('Session Callback', { session, token })
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        // select: { password: false },
      })

      if (user) {
        const u = user as User
        return {
          ...session,
          user: {
            ...session.user,
            id: u.id,
            phoneNumber: u.phoneNumber,
            customerIntakeFormSubmited: u.intakeFormSubmited,
          },
        }
      }
      return session
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.id,
      //     phoneNumber: token.phoneNumber,
      //     customerIntakeFormSubmited: token.intakeFormSubmited,
      //   },
      // }
    },
    // jwt: ({ token, user }) => {
    //   console.log('JWT Callback', { token })
    //   console.log('JWT Callback USER', { user })
    //   if (user) {
    //     const u = user as User
    //     return {
    //       ...token,
    //       id: user.id,
    //       phoneNumber: u.phoneNumber,
    //       customerIntakeFormSubmited: u.intakeFormSubmited,
    //     }
    //   }
    //   return token
    // },
  },
}
export default NextAuth(authOptions)

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

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
    const userWithoutPassword = exclude(user, ['password'])
    console.log(userWithoutPassword)
    return {
      id: userWithoutPassword.id,
      email: userWithoutPassword.companyEmail,
      name: userWithoutPassword.companyName,
      phoneNumber: userWithoutPassword.phoneNumber,
      customerIntakeFormSubmited: userWithoutPassword.intakeFormSubmited,
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
      customerIntakeFormSubmited: newUser.intakeFormSubmited,
      // randomKey: 'Hey cool',
    }
    // const res = Create_Account_Schema.safeParse(companyName, companyEmail)
  } catch (error: any) {
    throw new Error(error)
  }
}
