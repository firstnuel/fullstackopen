const Contact = ({name, number, handleDelete}) => {
  return (
  <div>{name} {number} 
  <button onClick={handleDelete}>delete</button>
  </div>
  )
}

const Persons = ({ persons, handleDelete }) => {
    return (
      <>
        {persons.map((person, i) => 
          <Contact 
          key={i} 
          name={person.name} 
          number={person.number} 
          handleDelete={() => handleDelete(person.id)} />
        )}
      </>
    )
  }
  
export default Persons