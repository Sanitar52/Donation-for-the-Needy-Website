import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { email: 'String1772758', updatedAt: '2024-03-27T12:06:40.193Z' },
    },
    two: {
      data: { email: 'String2564756', updatedAt: '2024-03-27T12:06:40.193Z' },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
