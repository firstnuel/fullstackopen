import { useState } from 'react'

const Button = ({name, handleClick}) => {
  return(
    <>
      <button
        onClick={handleClick}
        >{name}
      </button>
    </>

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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const handleClick = () =>{
    let random = Math.floor(Math.random() * anecdotes.length);
     setSelected(random)
    }
  const handleVote = () =>{ 
    let copy = [...points]
    copy[selected] += 1;
    setPoints(copy)

  }

  const index = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]} 
      <br />
      <div>has {points[selected]} votes</div>
      <Button name="vote" handleClick={handleVote} />
      <Button name="next anecdote" handleClick={handleClick} />

      <h1>Anecdotes with most votes</h1>
      {Math.max(...points) === 0? <p>no anecdotes has been voted yet</p> : 
      <>
      <div>{anecdotes[index]}</div>
      has {points[index]} votes
      </>}
      
    </div>
  )
}

export default App