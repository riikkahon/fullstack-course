import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        const filter = event.target.value
        dispatch(filterChange(filter))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input type="text" onChange={handleFilterChange} />
      </div>
    )
  }
  
  export default Filter