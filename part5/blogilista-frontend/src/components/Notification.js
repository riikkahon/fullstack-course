
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="hello">
      {message}
    </div>
  )
}


export default Notification