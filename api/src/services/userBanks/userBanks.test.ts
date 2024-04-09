import type { UserBank } from '@prisma/client'

import {
  userBanks,
  userBank,
  createUserBank,
  updateUserBank,
  deleteUserBank,
} from './userBanks'
import type { StandardScenario } from './userBanks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userBanks', () => {
  scenario('returns all userBanks', async (scenario: StandardScenario) => {
    const result = await userBanks()

    expect(result.length).toEqual(Object.keys(scenario.userBank).length)
  })

  scenario('returns a single userBank', async (scenario: StandardScenario) => {
    const result = await userBank({ id: scenario.userBank.one.id })

    expect(result).toEqual(scenario.userBank.one)
  })

  scenario('creates a userBank', async (scenario: StandardScenario) => {
    const result = await createUserBank({
      input: {
        userId: scenario.userBank.two.userId,
        name: 'String',
        balance: 3546714.5119216517,
      },
    })

    expect(result.userId).toEqual(scenario.userBank.two.userId)
    expect(result.name).toEqual('String')
    expect(result.balance).toEqual(3546714.5119216517)
  })

  scenario('updates a userBank', async (scenario: StandardScenario) => {
    const original = (await userBank({
      id: scenario.userBank.one.id,
    })) as UserBank
    const result = await updateUserBank({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a userBank', async (scenario: StandardScenario) => {
    const original = (await deleteUserBank({
      id: scenario.userBank.one.id,
    })) as UserBank
    const result = await userBank({ id: original.id })

    expect(result).toEqual(null)
  })
})
