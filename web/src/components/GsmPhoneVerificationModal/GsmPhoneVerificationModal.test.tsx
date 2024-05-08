import { render } from '@redwoodjs/testing/web'

import GsmPhoneVerificationModal from './GsmPhoneVerificationModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GsmPhoneVerificationModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GsmPhoneVerificationModal />)
    }).not.toThrow()
  })
})
