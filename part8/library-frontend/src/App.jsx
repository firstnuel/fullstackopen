import { useEffect, useState } from "react"
import { useApolloClient } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import Notification from "./components/Notification"
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from "./queries"
import { updateCache } from "../updatecache"


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState('')
  const client = useApolloClient()
  const queries = [
    { query: ALL_AUTHORS, queryName: 'allAuthors' },
    { query: ALL_BOOKS, queryName: 'allBooks' }
  ]

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      setMessage("New Book added: ", bookAdded.title)
      updateCache(client.cache, queries, bookAdded)

    }
  })

  useEffect(() => {
    const tkn = localStorage.getItem('library-user-token')
    if (tkn) setToken(tkn)
  }, [token])

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("login")
  }

  return (
    <div>
      <Notification msg={message} setMsg={setMessage}/>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommend")}>recommend</button>}
        {token ? 
        <button onClick={logOut}>logout</button>
        : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors token={token}
       show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommend show={page === "recommend"} />

      <NewBook show={page === "add"} />

      <LoginForm setToken={setToken}
        setPage={setPage}
        show={page === "login"}/>
    </div>
  );
};

export default App;
