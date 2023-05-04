import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BookDescriptionEdit = () => {

        const [book, update] = useState({
            description: "",
        })
        const { bookId } = useParams()
        const navigate = useNavigate()
    
        useEffect(() => {
            fetch(`http://localhost:8088/books/${bookId}`)
                .then(res => res.json())
                .then((data) => {
                    update(data)
                })
        }, [bookId])
    
        const bookEditButton = (event) => {
            event.preventDefault()

    //request to save data
            return fetch(`http://localhost:8088/books/${bookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/userBooks")
                })
        }
    
      return ( 
        <form className="editBookForm">
            <h2 className="bookEditForm__title"> Edit This </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={book.description}
                        onChange={
                            (evt) => {
                                const copy = { ...book }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        }> </textarea>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => bookEditButton(clickEvent)}
                className="btn btn-primary">
                Save Edits
            </button>
        </form>
        )
}

