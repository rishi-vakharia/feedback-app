import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is item 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This is item 3',
      rating: 7,
    },
  ])

  const [itemToEdit, setItemToEdit] = useState(null)

  const deleteItem = (id) => {
    setFeedback(
      feedback.filter(item => item.id!== id)
    )
  }

  const addItem = (newItem) => {
    newItem.id = uuidv4()
    setFeedback([newItem, ...feedback])
  }

  const editItem = (item) => {
    setItemToEdit(item)
  }

  const updateItem = (updItem) => {
    setFeedback(
      feedback.map(item => item.id === updItem.id ? updItem : item)
    )
    setItemToEdit(null)
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        itemToEdit,
        deleteItem,
        addItem,
        editItem,
        updateItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext