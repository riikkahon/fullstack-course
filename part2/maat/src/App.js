import React from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => 
      setCountries(response.data)
)
  }, [])

  

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    
  }

 
  return(
    <div>
      <h2>Countries</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    
      <Countries countries={countries} newFilter={newFilter}/>
    </div>
  )

}

export default App
