import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlicer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
      updateAnecdote(state, action){
        const updatedAnecdote = action.payload
        return state.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      )
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
      }
  }

)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(votedAnecdote))
  }
}


export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlicer.actions
export default anecdoteSlicer.reducer
