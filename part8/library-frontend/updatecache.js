export const updateCache = (cache, queries, newObject) => {
    // helper that is used to eliminate saving same item twice
    const uniqByTitle = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.title
        return seen.has(k) ? false : seen.add(k)
      })
    }
  
    queries.forEach(({ query, queryName }) => {
      cache.updateQuery(query, (data) => {
        if (!data) return null
        return {
          [queryName]: uniqByTitle([...data[queryName], newObject]),
        }
      })
    })
}