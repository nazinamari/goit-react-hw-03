import Contact from '../Contact/Contact';

export default function ContactList ({ contacts, onDelete}) {
    return (
        <ul>
            {contacts.map(contact => (
                <li key={contact.id}>
                    <Contact data={contact} onDelete={onDelete}/>
                </li>
            ))}
        </ul>
    )
} 