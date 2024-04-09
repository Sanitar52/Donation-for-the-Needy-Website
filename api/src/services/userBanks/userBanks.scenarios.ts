import type { Prisma, UserBank } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserBankCreateArgs>({
  userBank: {
    one: {
      data: {
        name: 'String',
        balance: 2267539.5327032623,
        user: {
          create: {
            email: 'String2207180',
            updatedAt: '2024-04-07T12:57:25.825Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        balance: 8472171.405221771,
        user: {
          create: {
            email: 'String5810674',
            updatedAt: '2024-04-07T12:57:25.825Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserBank, 'userBank'>
