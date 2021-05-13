import { render } from '@testing-library/react'

import { Hello } from '../Hello'

describe('<Footer />', () => {
  it('should render', async () => {
    const { getByText } = render(<Hello />)
    expect(getByText('Hello world! 👋')).toBeInTheDocument()
  })
})
