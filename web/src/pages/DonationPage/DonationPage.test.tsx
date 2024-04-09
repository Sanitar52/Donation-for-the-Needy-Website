import { render } from '@redwoodjs/testing/web'

import DonationPage from './DonationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DonationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DonationPage />)
    }).not.toThrow()
  })
})
