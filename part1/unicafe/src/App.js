import { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const StatsHeader = (props) => {
  return(
    <h1>{props.statistics}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  if (props.text==="positives"){
    return(
      
       <tr><td>{props.text}: {props.value} % </td></tr>
     
    )
  }
  return(
    
      <tr><td>{props.text}: {props.value}</td></tr>
    
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const average = (props.good - props.bad)/total
  const positives = (props.good/total)*100

if (total === 0){
return(
  <div>
      No feedbacks yet
  </div>
)
}
  return(
    <div>
      <table>
        <tbody>
           <StatisticLine text='good' value={props.good}/>
           <StatisticLine text='bad' value={props.bad}/>
           <StatisticLine text='neutral' value={props.neutral}/>
           <StatisticLine text='total' value={total}/>
           <StatisticLine text='average' value={average}/>
           <StatisticLine text='positives' value={positives} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const header = 'Give Feedback'
  const statistics = 'Statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log('stats of good ', good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log('stats of bad', bad + 1)
    
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log('stats of neutral', neutral + 1)
  }


  return (
    <div>
      <Header header = {header}/>
      <Button handleClick = {handleGoodClick} text = 'Good'/>
      <Button handleClick = {handleNeutralClick} text = 'Neutral'/>
      <Button handleClick = {handleBadClick} text = 'Bad'/>
      <StatsHeader statistics = {statistics}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
      
    </div>
  )
}

export default App
