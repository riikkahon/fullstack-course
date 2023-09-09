import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

//import anecdoteService from './services/anecdotes'
//import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  /*useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])*/

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      <AnecdoteList/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App