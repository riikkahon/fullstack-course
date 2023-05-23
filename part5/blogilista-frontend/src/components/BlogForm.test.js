import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('Creates new blog', async () => {

  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inpu1 = screen.getByLabelText('title')
  const input2 = screen.getByLabelText('author')
  const input3 = screen.getByLabelText('url')
  const button = screen.getByText('create')

  await user.type(inpu1, 'this is title')
  await user.type(input2, 'this is author')
  await user.type(input3, 'this is url')
  await user.click(button)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is title')
  expect(createBlog.mock.calls[0][0].author).toBe('this is author')
  expect(createBlog.mock.calls[0][0].url).toBe('this is url')
})