import { Outlet, Route, Routes } from "react-router-dom"
import { BookshelfList} from "../books/BookshelfList"
import { BookshelfForm } from "../books/BookshelfForm"

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

                { <Route path="bookshelves" element={ <BookshelfList /> } /> }
				 <Route path="bookshelf/create" element={ <BookshelfForm /> } /> 
            </Route>
        </Routes>
    )
}

