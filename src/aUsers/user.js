

export const User = ({ id, fullName, email }) => {
    return <section className="user">
        <div>
            <Link to={`/users/{id}`}>Book: {fullName}</Link>
        </div>
        <div>Name: {fullName}</div>
        <div>Email: {email}</div>
    </section>
}