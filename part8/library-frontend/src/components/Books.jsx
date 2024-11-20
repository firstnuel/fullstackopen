import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
const Books = ({ show }) => {
  const [filter, setFilter] = useState(null);

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: filter, author: null },
  })

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks
  const genres = [];

  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) genres.push(genre)
    })
  })

  return (
    <div>
      <h2>books</h2>
      {filter ? (
        <div>
          in genre <strong>{filter}</strong>
        </div>
      ) : (
        <div>all genres</div>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books;
