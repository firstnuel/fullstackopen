/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { ME, ALL_BOOKS } from "../queries"

const Recommend = ({ show }) => {
    const userResult = useQuery(ME)
    const result = useQuery(ALL_BOOKS)

    if (!show) {
        return null
      }
    
    if (result.loading || userResult.loading)  {
    return <div>loading...</div>
    }

    const books = result.data.allBooks
    const user = userResult.data.me

    const recommendedBooks = books.filter(book => book.genres.includes(user.favoriteGenre.toLowerCase()))
     
    return (
        <div>
      <h2>recommendations</h2>
        <div>books in your favorite genre <strong>patterns</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}


export default Recommend