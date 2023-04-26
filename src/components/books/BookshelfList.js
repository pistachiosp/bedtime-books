import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./BookshelfList.css"

export const BookshelfList = () => {
    const [bookshelves, setBookshelves ] = useState([])
    const [filteredBookshelves, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState()
    const navigate = useNavigate()

    //Returns the current value associated with the given key, or null if the given key does not exist.
    const localHoneyUser = localStorage.getItem("book_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


useEffect(() => {
    fetch(`http://localhost:8088/bookshelves`)
    .then(res => res.json())
    .then((bookshelfArray) =>{
        setBookshelves(bookshelfArray)
    })
    },
    [] // When this array is empty, you are observing initial component state
)

    

    return <>
        {
            <button onClick={() => navigate("/bookshelf/create")}>Add Book</button>
        }
           

    <h2>Bookshelf</h2>
    <article className="bookshelves">
        {
            bookshelves.map(
                (bookshelf) => {
                    return <section className='bookshelf' key={`bookshelf--${bookshelf.id}`}>
                        <header>{bookshelf.bookName}</header>
                        <header>{bookshelf.description}</header>
                        {/* <header>{bookshelf.themeType}</header> */}
                        
                    </section>
                }
            )
        }
    </article>
    </>
}