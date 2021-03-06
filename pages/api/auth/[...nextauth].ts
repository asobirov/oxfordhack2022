import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@lib/prisma';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER
        })
    ],
})
