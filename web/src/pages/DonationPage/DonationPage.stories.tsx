import type { Meta, StoryObj } from '@storybook/react'

import DonationPage from './DonationPage'

const meta: Meta<typeof DonationPage> = {
  component: DonationPage,
}

export default meta

type Story = StoryObj<typeof DonationPage>

export const Primary: Story = {}
