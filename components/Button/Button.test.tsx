import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '.'

describe('<Button/>', () => {
  it('Should match snapshot', () => {
    const { container } = render(<Button>Click me</Button>)

    expect(container.firstChild).toMatchSnapshot()
  })
})
