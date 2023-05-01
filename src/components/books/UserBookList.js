import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export const UsersBookList = () => {
    const [myBooks, updateMyBookList] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    useEffect(() => {
        fetch(`http://localhost:8088/userBooks?_expand=user&_expand=book`)
        .then(res => res.json())
        .then((booksArray) =>{
            updateMyBookList(booksArray)
        })
    },
    [] // When this array is empty, you are observing initial component state
    )
    //user can see only there books
    // useEffect (
    //     () => {
    //         const myBooks = myBookList.filter(books => books.userId === bookUserObject.id)
    //         setBookshelves(myBooks)
    //     },
    //     []
    // )




    return <>
           

    <h2>My BookList</h2>
    <article className="userbooks">
        {
            myBooks.map(
                (myBook) => {
                    return <section className='bookshel' key={`book--${myBook.id}`}>
                        <header>{myBook.bookName}</header>
                        <header>{myBook.description}</header>
                        <header>{myBook.themeTypes.theme}</header>
                        <button> Edit</button>
                        <button> Delete</button>
                        
                        
                    </section>
                }
            )
        }
    </article>
    </>
}


