import React from "react"

const Total = ({parts}) => {
    const total = parts.reduce(function(sum, number) {
    return sum + number.exercises
    }, 0)
    return (
      <div>
        total of {total} exercises
      </div>
    )
    }

    export default Total