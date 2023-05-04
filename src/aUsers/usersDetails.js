// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"

// export const UserDetails = () => {
//     const {userId} = useParams()
//     const [user, updateUser] = useState()

//     useEffect (
//         () => {
//             fetch(`http://localhost:8088/userBooks?_expand=book_embed=userId=${userId}`)
//             .then(res => res.json())
//             .then((data) => {
//                 const singleUser= data[0]
//                 updateUser(singleUser)
//             })
//         },
//         [userId]
//     )
//     return <section className="user">
//         <header>{user?.user?.fullName}</header>
//     </section>
// }