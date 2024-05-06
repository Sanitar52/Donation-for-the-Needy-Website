import { render } from '@redwoodjs/testing/web'

import RecentDonationSlider from './RecentDonationSlider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecentDonationSlider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecentDonationSlider />)
    }).not.toThrow()
  })
})
