import { useState } from 'react'


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>
      </tr>
    </tbody>
  )
}
const Feedback = ({ handlers }) => {
  return (
    <>
      <Button text="good" onClick={handlers.handleGood} />
      <Button text="neutral" onClick={handlers.handleNeutral} />
      <Button text="bad" onClick={handlers.handleBad} />
    </>
  )
}
const Statistics = ({ good, neutral, bad, isFeedbackGathered }) => {
  const totalVotes = good + neutral + bad;
  const averageScore = (good - bad) / totalVotes;
  const positiveFeedbackPercentage = good / totalVotes;
  if (isFeedbackGathered) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalVotes} />
          <StatisticLine text="average" value={averageScore} />
          <StatisticLine text="positive" value={positiveFeedbackPercentage} />
        </table>
      </>
    )
  }
  else {
    return (
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
      <Feedback handlers={{ handleGood, handleNeutral, handleBad }} />
      <Statistics isFeedbackGathered={isFeedbackGathered} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App