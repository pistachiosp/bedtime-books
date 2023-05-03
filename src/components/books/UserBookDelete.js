
const 

const deleteButton = () => {
    if (currentUser) {
        return <button onClick={() => {
            fetch(`http://localhost:8088/userBooks?_expand=user&_expand=book/${bookObject.id}`, {
                method: "DELETE"
            })
            .then(() => {
                getAllBooks()

            })
        }} className="book__delete">Delete</button>
    }
    else {
        return ""
    }
}