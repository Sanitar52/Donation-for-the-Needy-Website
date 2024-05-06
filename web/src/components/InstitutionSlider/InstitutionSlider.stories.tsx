// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import InstitutionSlider from './InstitutionSlider'

const meta: Meta<typeof InstitutionSlider> = {
  component: InstitutionSlider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InstitutionSlider>

export const Primary: Story = {}
