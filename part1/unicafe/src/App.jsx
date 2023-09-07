import { useState } from 'react'

const Feedback = ({handlers}) =>{
  return (
    <>
      <button onClick={handlers.handleGood}>good</button>
      <button onClick={handlers.handleNeutral}>neutral</button>
      <button onClick={handlers.handleBad}>bad</button>
    </>
  )
}
const Statistics = ({good, neutral, bad, isFeedbackGathered}) => {
  const totalVotes = good + neutral + bad;
  const averageScore = (good - bad) / totalVotes;
  const positiveFeedbackPercentage = good / totalVotes;
  if (isFeedbackGathered)
  {
    return (
      <>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {totalVotes}</p>
        <p>average {averageScore}</p>
        <p>positive {positiveFeedbackPercentage}</p>
      </>
    )
  }
  else
  {
    return(
      <></>
    )
  }
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [isFeedbackGathered, setIsFeedbackGathered] = useState(false);

  const handleGood = () => {
    setGood(good + 1);
    setIsFeedbackGathered(true);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setIsFeedbackGathered(true);
  }
  const handleBad = () => {
    setBad(bad + 1);
    setIsFeedbackGathered(true);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback handlers={ {handleGood, handleNeutral, handleBad} }/>
      <Statistics isFeedbackGathered={isFeedbackGathered} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App