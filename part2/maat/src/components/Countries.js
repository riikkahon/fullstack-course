import React from 'react'

const Countries = ({countries, newFilter}) =>  {

    

  if (countries.lenght > 10){
    return(
        <p>Too many matches</p>
    )
  } else if ((countries.lenght > 2 && countries.lenght < 10) || countries.lenght === 0) {
    return(
        <div>
        {countries.map((country) => {
        return(
            <div>
                <h3>{country.name.common}</h3>
            </div>
       )
}
    
)}  
        </div>
    )
  } else{
  return(
    <div>
    {countries.filter((country) => {
      return newFilter.toLowerCase() === ''
      ? country
      : country.name.common.toLowerCase().includes(newFilter)
    }).map((country) => {
       return(
            <div>
                
                <h3>{country.name.common}</h3>
                <ul>
                <li>Capital: {country.capital}</li>
                <li>Area: {country.area}</li>
                <li>Population: {country.population}</li>
                <img src={country.flags.png} alt="flag"></img>
                </ul>
            </div>
       )
}
    
)}

    </div>
  )

  }
}

export default Countries