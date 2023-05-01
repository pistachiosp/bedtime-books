import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./BookshelfList.css"

export const BookList = () => {
    const [books, setbooks ] = useState([])
    // const [addToUser, updateAddToUser] = useState()
    // const [filteredbooks, setFiltered] = useState([])
    const navigate = useNavigate()

    //Returns the current value associated with the given key, or null if the given key does not exist.
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    

useEffect(() => {
    fetch(`http://localhost:8088/books?_expand=themeTypes`)
    
    .then(res => res.json())
    .then((bookshelfArray) =>{
        setbooks(bookshelfArray)
    })
    },
    [] // When this array is empty, you are observing initial component state
)
// const [userBooks, update] = useState({
//     userId: 0,
//     bookId: 0
// })

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
                        <header>{book.bookName}</header>
                        <header>{book.description}</header>
                        <header>{book.themeTypes.theme}</header>
                        <button onClick={(clickEvent) => handleSaveBookButtonClick(clickEvent, book)} className="save-book-btn"> Add Me To Your List</button>
                        
                    </section>
                }
            )
        }
    </article>
    </>
}

// {() => navigate("/userBooks/create")}