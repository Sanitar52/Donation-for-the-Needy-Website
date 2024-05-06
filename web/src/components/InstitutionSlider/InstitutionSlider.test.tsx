import { render } from '@redwoodjs/testing/web'

import InstitutionSlider from './InstitutionSlider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InstitutionSlider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InstitutionSlider />)
    }).not.toThrow()
  })
})
