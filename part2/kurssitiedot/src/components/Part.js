import React from "react"

const Part = ({part}) => {
    return(
      <div>
          <li>{part.name} {part.exercises}</li>
      </div>
    )
    }

export default Part