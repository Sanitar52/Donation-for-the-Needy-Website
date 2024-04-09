import type { Prisma, Donation } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DonationCreateArgs>({
  donation: {
    one: {
      data: {
        amount: 817697.2429757323,
        paymentMethod: 'String',
        paymentStatus: 'Pending',
        institution: { create: { updatedAt: '2024-04-09T13:09:04.198Z' } },
        user: {
          create: {
            email: 'String7373926',
            updatedAt: '2024-04-09T13:09:04.198Z',
          },
        },
        userBank: {
          create: {
            name: 'String',
            balance: 3036115.881317276,
            user: {
              create: {
                email: 'String8773600',
                updatedAt: '2024-04-09T13:09:04.198Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        amount: 76289.87019161481,
        paymentMethod: 'String',
        paymentStatus: 'Pending',
        institution: { create: { updatedAt: '2024-04-09T13:09:04.198Z' } },
        user: {
          create: {
            email: 'String8278606',
            updatedAt: '2024-04-09T13:09:04.198Z',
          },
        },
        userBank: {
          create: {
            name: 'String',
            balance: 4578320.006022385,
            user: {
              create: {
                email: 'String9063930',
                updatedAt: '2024-04-09T13:09:04.198Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Donation, 'donation'>
