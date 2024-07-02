
import { User, Prisma, Device } from '@prisma/client'
import NextCrud, { PrismaAdapter } from '@premieroctet/next-crud'
import { RouteType } from '@premieroctet/next-crud'

import prisma from "@/prisma/client";
 

const handler = async (req: Request) => {
  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter<User | Device,Prisma.ModelName>({
      prismaClient: prisma,
    }),
  })
 
  return nextCrudHandler(req)
}
 
export { handler as POST, handler as GET, handler as PUT, handler as DELETE }