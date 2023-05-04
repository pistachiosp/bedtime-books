import { Link } from "react-router-dom"

export const Book = ({bookObject, currentUser, getAllBooks}) => {

    const deleteButton = () => {
        if 
        
           return fetch(`http://localhost:8088/userBooks/}`, {
            method: "DELETE",
            body: JSON.stringify(bookToRemove)
           })
           .then(() => {
                getMyBooks()
           })
         
    }
}