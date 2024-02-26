import css from './App.module.css';
// import { GlobalStyle } from './utils/GlobalStyle';
// import { Box } from './utils/Box';

import { useState} from 'react';
import { useEffect} from 'react';
import initualContacts from '../data/contacts.json';
import ContactForm  from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

// import { nanoid } from 'nanoid';

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
        <div className={css.container}>
            <ContactForm onAdd={addContact}/>
            <Filter value={filter} onFilter={setFilter}/>
            <ContactList contacts={visibleContacts} onDelete={deleteContact}/>
        </div>
    )

}


    
    //   componentDidMount() {
    //     const contacts = localStorage.getItem('Contacts');
    //     const parsedContacts = JSON.parse(contacts);
    //     if (contacts) {
    //       this.setState({ contacts: parsedContacts });
    //     }
    //   }
    
    //   componentDidUpdate(prevState) {
    //     if (prevState.contacts !== this.state.contacts) {
    //       localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    //     }
    //   }
    
    //   render() {
    //     const { contacts, filter } = this.state;
    //     const normalizedFilter = filter.toLowerCase();
    //     const visibleContacts = contacts.filter(item => item.name.toLowerCase().includes(normalizedFilter)
    //     );
    
    //     return (
    //       <Box m="0 auto">
    //         {/* ------Add Contacts------- */}
    //         <h1>My PhoneBook</h1>
    //         <Box
    //           display="flex"
    //           flexDirection="row"
    //           justifyContent="center"
    //           gridGap={5}>
    //             <Section>
    //             <Form onSubmit={this.addContact} />
    //             </Section>
    //         {/* ------My Contacts------- */}
    //             <Section>
    //               {this.state.contacts.length ? (
    //                 <Box
    //                   display="flex"
    //                   flexDirection="column"
    //                 >
    //                   {/* ------Filter------- */}
    //                 <Filter
    //                     onChange={this.onChangeFilter}  
    //                     value={filter}
    //                   />
    //                 {/* ------Contact List------- */}
    //                 <Section title="Contacts">
    //                   <ContactList
    //                     contacts={visibleContacts}
    //                     onDeleteContact={this.deleteContact}
    //                   />
    //                 </Section>
    //                 </Box>
    //               ) : (<p>There are no contacts.</p>
    //               )}
    //             </Section>
    //         </Box>
    //         <GlobalStyle />
    //       </Box>
    //     )
    //   }
    // }