import type { Prisma, Institution } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InstitutionCreateArgs>({
  institution: {
    one: { data: { updatedAt: '2024-03-27T12:05:58.043Z' } },
    two: { data: { updatedAt: '2024-03-27T12:05:58.043Z' } },
  },
})

export type StandardScenario = ScenarioData<Institution, 'institution'>
