const PersonForm = ({handleSubmit, handleNameChange, newName, handlePhoneChange, newNumber}) => {
    return(
      <form onSubmit={handleSubmit}>
      <div>
        name: <input
        onChange={handleNameChange} 
        value={newName} required />
      </div>
      <div>
        number: <input
        onChange={handlePhoneChange} 
        value={newNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
      
    </form>
    )
  }

export default PersonForm