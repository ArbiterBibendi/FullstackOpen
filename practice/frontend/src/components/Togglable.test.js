import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container
  const CONTENT_TEXT = 'togglable content'
  const BUTTON_TEXT = 'show...'
  const SELECTOR = '.togglableContent'

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel={BUTTON_TEXT}>
        <div className='testDiv'>
          {CONTENT_TEXT}
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText(CONTENT_TEXT)
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector(SELECTOR)
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    const div = container.querySelector(SELECTOR)
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)
    const div = container.querySelector(SELECTOR)
    expect(div).toHaveStyle('display: none')
  })
})
