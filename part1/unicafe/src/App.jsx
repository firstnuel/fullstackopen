import { useState } from 'react'

const Button = ({name, handleClick}) =>{
  return (
    <button
    onClick={handleClick}>
      {name}
    </button>
  )
 }

const StatisticLine = ({text, value, symbol=null}) => {
  return (
    <tbody>
        <tr>
          <td>{text}</td> 
          <td>{value} {symbol}</td>
      </tr>
    </tbody>)
  }

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  let average = ((good * 1)  + (neutral * 0) + (bad * -1)) / (good + neutral + bad);

return (
  <>
  <h1>statistics</h1>

{all ?  <table>
  <StatisticLine text="good" value={good}/>
  <StatisticLine text="neutral" value={neutral}/>
  <StatisticLine text="bad" value={bad}/>
  <StatisticLine text="all" value={all}/>
  <StatisticLine text="average" value={average}/>
  <StatisticLine text="positive" value={(good / all) * 100} symbol={"%"}/>
  </table> : <p>No feedback given</p>}
  </>
)

}


const App = () => {
// save clicks of each button to its own state
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)

const handleGoodClick = () =>{
  let updated = good + 1;
  setGood(updated)
}

const handleNeutralClick = () =>{
  let updated = neutral + 1;
  setNeutral(updated)
}

const handleBadClick = () =>{
  let updated = bad + 1;
  setBad(updated)
}


  return (
    <div>
      <h1>give feedback</h1>
      <Button 
      name="good"
      handleClick = {handleGoodClick}
       />

      <Button 
      name="neutral"
      handleClick = {handleNeutralClick}
       />

      <Button 
      name="bad"
      handleClick = {handleBadClick}
       />

      <Statistics 
      good = {good}
      neutral = {neutral}
      bad = {bad}
      />

    </div>
  )
}

export default App