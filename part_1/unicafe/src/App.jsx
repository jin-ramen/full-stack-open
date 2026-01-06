import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
   </tr> 
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.total} />
        <StatisticLine text='average' value={(props.good - props.bad) / props.total} />
        <StatisticLine text='positive' value={(props.good / props.total) * 100 + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const setToValue = (setter) => {
    setter(prev => prev + 1)
    setTotal(prev => prev + 1)

  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={() => setToValue(setGood)} text='good'/>
      <Button onClick={() => setToValue(setNeutral)} text='neutral'/>
      <Button onClick={() => setToValue(setBad)} text='bad'/>
      <Header text='statistic'/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App