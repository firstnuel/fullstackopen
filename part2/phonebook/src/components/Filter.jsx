const Filter = ({handleSearch, search}) => {
    return (
    <>
      filter shown with <input
      onChange={handleSearch} 
      value={search}/>
    </>
  )}

  export default Filter