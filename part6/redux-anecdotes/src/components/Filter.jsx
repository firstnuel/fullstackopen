import {  useDispatch } from 'react-redux'
import { filterChange, removeFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const content  = event.target.value
        if (content) {
            dispatch(filterChange(content))
        } else if (content === '') {
          dispatch(removeFilter())
        }
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter