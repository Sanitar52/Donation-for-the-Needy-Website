import { render } from '@redwoodjs/testing/web'

import PaymentMethodModal from './PaymentMethodModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PaymentMethodModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PaymentMethodModal />)
    }).not.toThrow()
  })
})
