/* eslint-disable react/prop-types */
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'
import { useState } from "react"

const Authors = ({ show, token }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <SetBirthYear authors={authors}/>}
    </div>
  )
}

export default Authors

const SetBirthYear = ({ authors }) => {
  const [authorName, setAuthorName] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR,
    { refetchQueries: [ { query: ALL_AUTHORS } ] }
  )

  const options = authors.map(a => ({
    value: a.name,
    label: a.name
  }))
  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: authorName.value, setBornTo: parseInt(born) } })

    setBorn('')
    setAuthorName(null)
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
      <div>
          name
          <Select
            defaultValue={authorName}
            onChange={setAuthorName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <div>
        <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}