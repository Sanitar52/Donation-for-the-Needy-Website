import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({ input }) => {
  const user = await db.user.create({
    data: {
      email: input.email,
      name: input.name,
      age: input.age,

    }
  })

  await db.userBank.createMany({
    data: input.user_banks.map((user_bank) => ({
      name: user_bank.name,
      balance: user_bank.balance,
      userId: user.id,
    })),
  })
  return user
}

export const updateUser: MutationResolvers['updateUser'] = async ({ id, input }) => {
  const user =await db.user.update({
    data: {
      email: input.email,
      name: input.name,
      age: input.age,
    },
    where: { id },
  })
  await db.userBank.deleteMany({
    where: { userId: id },
  })
  await db.userBank.createMany({
    data: input.user_banks.map((user_bank) => ({
      name: user_bank.name,
      balance: user_bank.balance,
      userId: user.id,
    })),
  })

  return user
}

export const deleteUser: MutationResolvers['deleteUser'] = async ({ id }) => {
  await db.donation.deleteMany({
    where: { userId: id },
  })
  await db.userBank.deleteMany({
    where: { userId: id },
  })
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  donations: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).donations()
  },
  user_bank: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).user_bank()
  },
}
