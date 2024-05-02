import type { Meta, StoryObj } from '@storybook/react'

import PastDonationsPage from './PastDonationsPage'

const meta: Meta<typeof PastDonationsPage> = {
  component: PastDonationsPage,
}

export default meta

type Story = StoryObj<typeof PastDonationsPage>

export const Primary: Story = {}
