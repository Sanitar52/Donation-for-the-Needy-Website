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
  const user = await db.user.update({
    data: {
      email: input.email,
      name: input.name,
      age: input.age,
    },
    where: { id },
  })
  const user_banks = await db.userBank.findMany({
    where: { userId: id },
  })
  // I want to check if the new input user_banks names are different from the current user_banks names if they are not then I don't want to delete the user_banks and create new ones

  const input_user_banks_names = input.user_banks.map((user_bank) => user_bank.name)
  const current_user_banks_names = user_banks.map((user_bank) => user_bank.name)
  // check if there is no change here
  if (input_user_banks_names.length === current_user_banks_names.length && input_user_banks_names.every((name) => current_user_banks_names.includes(name))) {
    return user
  }


    //Let the user know that if he deletes this then all the donations will be deleted


    await db.donation.deleteMany({
      where: { userId: id },
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
  // if there is a change then delete the current user_banks and create new ones and also remove donations and create new ones



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
