import { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const AnecdoteText = (props) => {
  return(
  <div>
    <p>{props.text}</p>
    <p>Votes: {props.votes}</p>
  </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const HighestVoteAnecdote = (props) => {
  const highestVoteValue = Math.max(...props.votes)
  const index = props.votes.indexOf(highestVoteValue)
  const winner = props.anecdotes[index]

  return(
    <div>
      <p>{winner}</p>
      <p>votes: {highestVoteValue}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const header = 'Anecdote of the day'
  const winnerHeader = 'Anecdote with most the votes'
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))


  const handleAneClick = () =>{
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected]+=1
    setVotes(newVotes)
  }

  return (
    <div>
      <Header header={header}/>
      <AnecdoteText text={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleAneClick} text="Next anecdote"/>
      <Button onClick={handleVoteClick} text= 'Vote'/>
      <Header header={winnerHeader}/>
      <HighestVoteAnecdote anecdotes={anecdotes} votes={votes}/>

    </div>
  )
}

export default App