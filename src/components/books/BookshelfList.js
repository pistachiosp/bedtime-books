import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./BookshelfList.css"

export const BookList = () => {
    const [books, setbooks ] = useState([])
    const navigate = useNavigate()
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    
useEffect(() => {
    fetch(`http://localhost:8088/books?_expand=themeTypes&_embed=userBooks`)
    .then(res => res.json())
    .then((bookshelfArray) =>{
        setbooks(bookshelfArray)
    })
    },
    [] // When this array is empty, you are observing initial component state
)


const handleSaveBookButtonClick = (event, bksId) => {
    event.preventDefault()
    const bookToSendToUserAPI = {
        userId: parseInt(bookUserObject.id),
        bookId: parseInt(bksId.id)
        
    }
    return fetch(`http://localhost:8088/userBooks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToSendToUserAPI)
        })
            .then(res => res.json())
            .then(() => {
               
                navigate("/bookshelves")
            })
}  
       
    return <>
        {
            <button onClick={() => navigate("/bookshelf/create")}>Add Book</button>
        }
           

    <h2>Bookshelf</h2>
    <article className="bookshelfList">
        {
            books.map(
                (book) => {
                    return <section className='bookshelfItemList' key={`book--${book.id}`}>
                        <header>Book Name: {book.bookName}</header>
                        <header>Description: {book.description}</header>
                        <header>Theme: {book.themeTypes.theme}</header>
                        <button onClick={(clickEvent) => handleSaveBookButtonClick(clickEvent, book)} className="save-book-btn"> Add Me To Your List</button>
                        
                    </section>
                }
            )
        }
    </article>
    </>
}



