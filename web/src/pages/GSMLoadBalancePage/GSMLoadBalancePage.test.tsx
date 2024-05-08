import { render } from '@redwoodjs/testing/web'

import GsmLoadBalancePage from './GsmLoadBalancePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GsmLoadBalancePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GsmLoadBalancePage />)
    }).not.toThrow()
  })
})
