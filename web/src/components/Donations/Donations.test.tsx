import { render } from '@redwoodjs/testing/web'

import Donations from './Donations'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Donations', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Donations />)
    }).not.toThrow()
  })
})
