import { Outlet, Route, Routes } from "react-router-dom"
import { BookList} from "../books/BookshelfList"
import { BookForm } from "../books/BookshelfForm"
import { UsersBookList } from "../books/UserBookList"
export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Whats My Bedtime Story</h1>
                    <div>Remember every Story</div>

                    <Outlet />
                </>
            }>

                { <Route path="bookshelves" element={ <BookList /> } /> }
				 <Route path="bookshelf/create" element={ <BookForm /> } />
                 <Route path="userBooks" element={ <UsersBookList /> } /> 
            </Route>
        </Routes>
    )
}

