import type { Institution } from '@prisma/client'

import {
  institutions,
  institution,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from './institutions'
import type { StandardScenario } from './institutions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('institutions', () => {
  scenario('returns all institutions', async (scenario: StandardScenario) => {
    const result = await institutions()

    expect(result.length).toEqual(Object.keys(scenario.institution).length)
  })

  scenario(
    'returns a single institution',
    async (scenario: StandardScenario) => {
      const result = await institution({ id: scenario.institution.one.id })

      expect(result).toEqual(scenario.institution.one)
    }
  )

  scenario('creates a institution', async () => {
    const result = await createInstitution({
      input: { updatedAt: '2024-05-01T15:30:18.296Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-05-01T15:30:18.296Z'))
  })

  scenario('updates a institution', async (scenario: StandardScenario) => {
    const original = (await institution({
      id: scenario.institution.one.id,
    })) as Institution
    const result = await updateInstitution({
      id: original.id,
      input: { updatedAt: '2024-05-02T15:30:18.296Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-05-02T15:30:18.296Z'))
  })

  scenario('deletes a institution', async (scenario: StandardScenario) => {
    const original = (await deleteInstitution({
      id: scenario.institution.one.id,
    })) as Institution
    const result = await institution({ id: original.id })

    expect(result).toEqual(null)
  })
})
