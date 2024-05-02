import type { Prisma, Institution } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InstitutionCreateArgs>({
  institution: {
    one: { data: { updatedAt: '2024-05-01T15:30:18.310Z' } },
    two: { data: { updatedAt: '2024-05-01T15:30:18.310Z' } },
  },
})

export type StandardScenario = ScenarioData<Institution, 'institution'>
