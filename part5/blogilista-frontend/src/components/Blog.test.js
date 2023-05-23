import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'



test('renders content', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'blogit.fi',
    likes: 5,
    user: '123453434'
  }

  const user = { name: 'Riikka' }

  const component = render(<Blog blog={blog} user={user}/>)
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'blogit.fi',
    likes: 5,
    user: {}
  }
  const user = { name: 'Riikka' }

  const updateBlog = jest.fn()
  const component = render(<Blog blog={blog} user={user} updateBlog={updateBlog} />)

  const button = screen.getByText('view')
  fireEvent.click(button)


  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(updateBlog).toHaveBeenCalledTimes(2)
  expect(component.container).toHaveTextContent('7')

})