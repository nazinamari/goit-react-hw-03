import { useState} from 'react';
import { useEffect} from 'react';
import initualContacts from '../data/contacts.json';
import ContactForm  from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

export default function App () {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts !== null ? JSON.parse(savedContacts) : initualContacts;
    });

    const [filter, setFilter] = useState('');

    const addContact = (newContact) => {
        setContacts((prevContacts) => {
            return[...prevContacts, newContact];
        });
    };

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts]);

    const deleteContact = (contactId) => {
        setContacts(prevContacts => {
            return prevContacts.filter((contact) => contact.id !== contactId)
        });
    };

    const visibleContacts = contacts.filter((contact) => 
        contact.name.toLowerCase().includes(filter.toLowerCase())
        );

    return (
        <div>
            <div className={css.wrapPhoneBook}>
                <h1>PhoneBook</h1>
                <section className={css.section}>
                    <ContactForm onAdd={addContact}/>
                </section>
                <section className={css.section}>
                    <Filter value={filter} onFilter={setFilter}/>
                </section>
                <section className={css.section}>
                    <ContactList contacts={visibleContacts} onDelete={deleteContact}/>
                </section>
            </div>
        </div>
    )

}
