import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BookForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
        const [book, update] = useState({
            name: "",
            themeTypeId: 0,
            description: "",
            rating: "",
            readTime: ""
        })
        const [types, setBookTypes] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8088/themeTypes`)
            .then(res => res.json())
            .then((bookshelfTypeArray) => {
                setBookTypes(bookshelfTypeArray)
            })
    },
        []
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the book list
    */
   const navigate = useNavigate()

   const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const bookToSendToAPI = {
            bookName: book.bookName,
            themeTypeId: book.themeTypeId,
            description: book.description,
            rating: book.rating,
            readTime: book.readTime
            
        }
        return fetch(`http://localhost:8088/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/bookshelves")
            })

   }
    return (
        <form className="bookshelfForm">
            <h2 className="bookshelfForm__title">Do You Have a Book/Story To Add?</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bookName">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="whats the book name"
                        value={book.bookName}
                        onChange={
                            (evt)=> {
                                const copy = {...book}
                                copy.bookName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="themeTypesId">theme type:</label>
                    <select className="themeTypes" onChange={(evt) => {
                        const copy = { ...book}
                        copy.themeTypeId = parseInt(evt.target.value)
                        update(copy)
                    }}>
                        <option value="0">see what we have to choose from</option>
                        {
                            types.map(type => {
                                return <option
                                key={`type--${type.id}`}
                                    className="themes"
                                    value={type.id}
                                >{type.theme}
                                </option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="write whatever you like"
                        value={book.description}
                        onChange={
                            (evt)=> {
                                const copy = {...book}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rating">What would you rate this book:</label>
                    <input type="text"
                        value={book.rating}
                        onChange={
                            (evt) => {
                                const copy = {...book}
                                copy.rating = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="readTime">Read Time:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="how long to read this book ex:(5-10min 10-15min)"
                        value={book.readTime}
                        onChange={
                            (evt)=> {
                                const copy = {...book}
                                copy.readTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add My Book
            </button>
        </form>
    )
}