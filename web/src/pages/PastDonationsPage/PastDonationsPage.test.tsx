import { render } from '@redwoodjs/testing/web'

import PastDonationsPage from './PastDonationsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PastDonationsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PastDonationsPage />)
    }).not.toThrow()
  })
})
