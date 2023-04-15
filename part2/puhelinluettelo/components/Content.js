import Person from "./Person"

const Content = ({persons, newFilter, handleDelete}) => {
    return(
    <ul>
    {persons.filter((persons) => {
      return newFilter.toLowerCase() === ''
      ? persons
      : persons.name.toLowerCase().includes(newFilter)
    }).map(persons => 
    <Person key={persons.name} persons={persons} handleDelete={handleDelete}/>
      )}
    
  </ul>
    )
  }

  export default Content
