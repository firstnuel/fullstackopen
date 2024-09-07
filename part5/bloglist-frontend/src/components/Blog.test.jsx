import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only the blog\'s title and author by default', () => {
  const blog = {
    title: 'Test blog',
    author: 'Emmanuel Ikwunna',
    url: 'nuel.com',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Test blog Emmanuel Ikwunna')

  expect(div).not.toHaveTextContent('nuel.com')
  expect(div).not.toHaveTextContent('5')
})

test('show blog\'s URL and number of likes when button is clicked', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Emmanuel Ikwunna',
    url: 'nuel.com',
    likes: 5,
    user: { id: '12345' }
  }
  const user = { id: '12345' }

  render(
    <Blog blog={blog} user={user} />
  )
  const userE = userEvent.setup()
  const button = screen.getByText('show')

  expect(button).toBeDefined()
  await userE.click(button)

  expect(screen.queryByText('nuel.com')).toBeDefined()
  expect(screen.queryByText('5')).toBeDefined()
})

test('if like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Emmanuel Ikwunna',
    url: 'nuel.com',
    likes: 5,
    user: { id: '12345' }
  }

  const user = { id: '12345' }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} user={user} handleAddLikes={mockHandler} />
  )

  const userE = userEvent.setup()
  const showButton = screen.getByText('show')
  await userE.click(showButton)

  const likeButton = screen.getByText('like')
  await userE.click(likeButton)
  await userE.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
