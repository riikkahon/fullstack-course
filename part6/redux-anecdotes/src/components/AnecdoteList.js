import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdotes = () => {
  
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => {

        const filtered = filter === "ALL"
        ? state.anecdotes
        : state.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
          )


        const sortedAnecdote = Array.isArray(filtered)
        ? [...filtered].sort((a, b) => b.votes - a.votes)
        : []
        
        return sortedAnecdote
      
    
    })
    
  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted for: ${anecdote.content}`, 10))

    /*setTimeout(() => {
      dispatch(clearNotification());
    }, 5000)*/
  }

    return(
        <ul>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        
        </div>
      )}
        </ul>
    )
}

export default Anecdotes

    /*console.log(state.anecdotes)
        const filtered = filter === "ALL"
        ? state.anecdotes
        : state.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
          )

          const sortedAnecdote = [...filtered].sort((a, b) => b.votes - a.votes)
          return sortedAnecdote*/