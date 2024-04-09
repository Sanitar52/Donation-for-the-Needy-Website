import type { Donation } from '@prisma/client'

import {
  donations,
  donation,
  createDonation,
  updateDonation,
  deleteDonation,
} from './donations'
import type { StandardScenario } from './donations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('donations', () => {
  scenario('returns all donations', async (scenario: StandardScenario) => {
    const result = await donations()

    expect(result.length).toEqual(Object.keys(scenario.donation).length)
  })

  scenario('returns a single donation', async (scenario: StandardScenario) => {
    const result = await donation({ id: scenario.donation.one.id })

    expect(result).toEqual(scenario.donation.one)
  })

  scenario('creates a donation', async (scenario: StandardScenario) => {
    const result = await createDonation({
      input: {
        institutionId: scenario.donation.two.institutionId,
        userId: scenario.donation.two.userId,
        userBankId: scenario.donation.two.userBankId,
        amount: 3676434.1592643503,
        paymentMethod: 'String',
        paymentStatus: 'Pending',
      },
    })

    expect(result.institutionId).toEqual(scenario.donation.two.institutionId)
    expect(result.userId).toEqual(scenario.donation.two.userId)
    expect(result.userBankId).toEqual(scenario.donation.two.userBankId)
    expect(result.amount).toEqual(3676434.1592643503)
    expect(result.paymentMethod).toEqual('String')
    expect(result.paymentStatus).toEqual('Pending')
  })

  scenario('updates a donation', async (scenario: StandardScenario) => {
    const original = (await donation({
      id: scenario.donation.one.id,
    })) as Donation
    const result = await updateDonation({
      id: original.id,
      input: { amount: 9741236.65159575 },
    })

    expect(result.amount).toEqual(9741236.65159575)
  })

  scenario('deletes a donation', async (scenario: StandardScenario) => {
    const original = (await deleteDonation({
      id: scenario.donation.one.id,
    })) as Donation
    const result = await donation({ id: original.id })

    expect(result).toEqual(null)
  })
})
