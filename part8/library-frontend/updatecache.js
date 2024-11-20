import { ALL_BOOKS } from "./src/queries"

export const updateCacheWith = (addedBook, cache) => {
    const uniqByTitle = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.title
        return seen.has(k) ? false : seen.add(k)
      })
    }
  
    const genres = addedBook.genres.filter(genre => {
      return cache.readQuery({ query: ALL_BOOKS, variables: { genre } })
    })
    
    genres.forEach(genre => {
      cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
        return {
          allBooks: uniqByTitle(allBooks.concat(addedBook)),
        }
      })
    })
  }