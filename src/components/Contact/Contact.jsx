export default function Contact ({ data: {id, name, number}, onDelete}) {
    return (
        <div>
            <div>
                <div>
                    <p>{name}</p>
                </div>
                <div>
                    <p>{number}</p>
                </div>
            </div>
            <button onClick={() => onDelete(id)}>
                Delete
            </button>
        </div>
    )
}