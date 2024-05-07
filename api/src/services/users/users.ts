import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { userBanks } from '../userBanks/userBanks'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany({
    where: { isActive: true },
    include: {
      user_bank: {
        where: { isActive: true },
      },
    },
  })
}

// Query a single active user with their active user banks
export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
    include: {
      user_bank: {
        where: { isActive: true },
      },
    },
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
  if (!input.user_banks) return user
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
  const user = await db.user.update({
    data: {
      email: input.email,
      name: input.name,
      age: input.age,
    },
    where: { id },
  })
  if (!input.user_banks) return user
  //if the user added new banks, create them only if they are not already in the database


    // update the user banks if the input does not have any new banks and
    await db.userBank.updateMany({
      where: { userId: id },
      data: {
        isActive: false,
      },
    })

    await db.userBank.createMany({
      data: input.user_banks.map((user_bank) => ({
        name: user_bank.name,
        balance: user_bank.balance,
        userId: user.id,
      })),
      skipDuplicates: true,
    })



    return user

}

export const deleteUser: MutationResolvers['deleteUser'] = async ({ id }) => {
  return db.user.update({
    data: { isActive: false },
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
