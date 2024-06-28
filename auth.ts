import NextAuth, { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import email from "next-auth/providers/email"
import bcrypt from 'bcrypt'
import prisma from "@/prisma/client";


class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        // Credentials({
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" },
        //     },
        //     // async authorize(credentials, req) {
        //     //     if (!credentials.email || !credentials.password) return null;
        //     //     const user = await prisma.user.findUnique({ where: { email: credentials.email as string } })
        //     //     if (!user) return null;
        //     //     const passwordsMatch = await bcrypt.compare(credentials.password as string, user.hashedPassword!)
        //     //     return passwordsMatch ? user : null;
        //     //     throw new InvalidLoginError()
        //     // },
        // })
    ],
})