import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import  "./UserBookList.css"



export const UsersBookList = () => {
    const [allBooks, setMyBookList] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
   

    useEffect(
        () => {
        fetch(`http://localhost:8088/userBooks?_expand=user&_expand=book`)
        .then(res => res.json())
        .then((booksArray) =>{
            setMyBookList(booksArray)
        })
    },
    [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (allBooks) {
                const onlyUsersBooks = allBooks.filter(book => book.userId === bookUserObject.id) 
                setFilteredBooks(onlyUsersBooks)
            } 
        },[allBooks]
        )

    return <>
           

    <h2>My BookList</h2>
    <article className="userBookList">
        {
            filteredBooks.map(
                (usersBook) => {
                    return <section className='userBookItemList' key={`userBook--${usersBook.id}`}>
                        <header>{usersBook.book.bookName}</header>
                        <header>{usersBook.book.description}</header>
                        <button>
                            <Link to={`/userBooks/${usersBook.book.id}/edit`}>Edit  </Link>
                        </button>
                        
                        <button> Delete</button>
                        
                        
                    </section>
                }
            )
        }
    </article>
    </>
}








