// import { User } from './../../../../../../node_modules/next-auth/core/types.d';
// import { CredentialsProviderType } from './../../../../../../node_modules/next-auth/src/providers/credentials';
import { authOptions } from "@/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }