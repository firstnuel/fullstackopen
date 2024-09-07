import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



test('calls the event handler it received as props with the right details when a new blog is created', async () => {
  const handleCreateNew = vi.fn()

  render(<BlogForm handleCreateNew={handleCreateNew} />)

  const user = userEvent.setup()

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })

  await user.type(titleInput, 'Testing the Forms')
  await user.type(authorInput, 'Emmanuel Ikwunna')
  await user.type(urlInput, 'nuel.com')

  const createButton = screen.getByRole('button', { name: /create/i })
  await user.click(createButton)

  expect(handleCreateNew).toHaveBeenCalledTimes(1)
  expect(handleCreateNew).toHaveBeenCalledWith({
    title: 'Testing the Forms',
    author: 'Emmanuel Ikwunna',
    url: 'nuel.com',
  })
})

