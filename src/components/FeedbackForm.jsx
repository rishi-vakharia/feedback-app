import { useEffect, useState, useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

function FeedbackForm() {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')


  const {addItem, itemToEdit, updateItem} = useContext(FeedbackContext)

  useEffect(() => {
    if(itemToEdit){
      setText(itemToEdit.text)
      setRating(itemToEdit.rating)
      setBtnDisabled(false)
    }
  }, [itemToEdit])


  const handleTextChange = e => {
    const inputText = e.target.value
    if(inputText === ''){
      setMessage('')
      setBtnDisabled(true)
    }
    else if(inputText.trim().length < 10){
      setMessage('Text must be atleast 10 characters')
      setBtnDisabled(true)
    }
    else{
      setMessage('')
      setBtnDisabled(false)
    }
    setText(inputText)
  }


  const handleSubmit = e => {
    e.preventDefault()
    if(text.trim().length >= 10){

      if(itemToEdit){
        const updItem = {
          text, 
          rating, 
          id: itemToEdit.id,
        }
        updateItem(updItem)
      }
      else{
        const newItem = {
          text, 
          rating,
        }
        addItem(newItem)
      }

      setText('')
      setBtnDisabled(true)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>

        <RatingSelect rating={rating} selectRating={(rating) => setRating(rating)} />
        
        <div className="input-group">

          <input type="text" placeholder="Write a review" onChange={handleTextChange} value={text} />

          <Button isDisabled={btnDisabled} type="submit">Send</Button>

        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}
export default FeedbackForm