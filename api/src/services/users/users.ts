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
    // update the user banks if the input does not have any new banks and

    const user_banks = await db.userBank.findMany({
      where: { userId: id, isActive: true},
    })
    // I want to check if the new input user_banks names are different from the current user_banks names if they are not then I don't want to delete the user_banks and create new ones

    const input_user_banks_names = input.user_banks.map((user_bank) => user_bank.name)
    const current_user_banks_names = user_banks.map((user_bank) => user_bank.name)
    // check if there is no change here in the balance or length or names of the user banks
    if (input_user_banks_names.length === current_user_banks_names.length && input_user_banks_names.every((name) => current_user_banks_names.includes(name)) && input.user_banks.every((user_bank, index) => user_bank.balance === user_banks[index].balance)){
      return user
    }

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
