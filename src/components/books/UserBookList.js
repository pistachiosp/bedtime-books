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

    const getMyBooks = () => {
        return fetch(`http://localhost:8088/userBooks?_expand=user&_expand=book`)
        .then((res) =>res.json())
        .then((booksArray) => {
            setMyBookList(booksArray)
        })
    }

    const deleteButton = (id) => {
        fetch(`http://localhost:8088/userBooks/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            getMyBooks()
        })
    }


    useEffect(
        () => {
            if (allBooks) {
                const onlyUsersBooks = allBooks.filter(book => book.userId === bookUserObject.id) 
                setFilteredBooks(onlyUsersBooks)
            } 
        },[allBooks, bookUserObject.id]
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
                            <Link to={`/userBooks/${usersBook.book.id}/edit`}>Edit</Link>
                        </button>
                        <button onClick={() => deleteButton(`${usersBook.id}`)} className="delete__book">Remove Book</button>
                    </section>
                }
            )
        }
    </article>
    </>
}



















// {usersBook.Id === (bookUserObject.id) && 

// const deleteButton = (clickEvent, bookId) => {
//     clickEvent.preventDefault()
//     const updatedBooks = filteredBooks.filter((book) => book.book.id !== bookId)
//         setFilteredBooks(updatedBooks)
// }


// const deleteButton = (clickEvent, booksId) => {
//     clickEvent.preventDefault()
//     const bookToRemove = {
//         userId: parseInt(bookUserObject.id),
//         bookId: parseInt(booksId.id)
//     }
//        return fetch(`http://localhost:8088/userBooks/${userBooksId}`, {
//         method: "DELETE",
//         body: JSON.stringify(bookToRemove)
//        })
//        .then(() => {
//             getMyBooks()
//        })
     
// }

 // const deleteButton = () => {
    //     const onlyUsersBooks = allBooks.filter(book => book.userId === bookUserObject.id)
    //     if (bookUserObject.id) {
        
    //        return <button onClick={() => {
    //         fetch(`http://localhost:8088/userBooks/${userBooksId}`, {
    //         method: "DELETE"
    //        })
    //        .then(() => {
    //             setFilteredBooks(onlyUsersBooks)
    //        })
    //     }} className="ticket__delete"></button>
    //     }
    //     else {
    //         return ""
    //     }
    // }
