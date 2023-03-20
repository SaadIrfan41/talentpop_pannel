export { default } from 'next-auth/middleware'

// export default withAuth({
//   pages: {
//     signIn: '/api/auth/signin',
//     // error: '/api/auth/error',
//   },
// })

export const config = { matcher: ['/'] }
