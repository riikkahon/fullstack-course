const Person = ({persons, handleDelete}) => {
    return(
      <p>{persons.name} {persons.number} <button onClick={() => handleDelete(persons.id)}>delete</button></p>
    )
    
  }

  export default Person