import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import {Container, TitleMain, TitleSec} from './App.styled'
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contactData => {
    const isIncludes = contacts.some(({name, number}) => 
        name.toLowerCase() === contactData.name.toLowerCase() ||
        number === contactData.number
        ); 
    if(isIncludes) {
      alert('A contact with the same name or number is already in contacts');
      return;
    }

    const newContact = {
      id: nanoid(5),
      ...contactData,
    }
  
    setContacts(state => [newContact, ...state]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  };

  const getVisibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) => 
      name.toLowerCase().includes(normalizedFilter)
    );
  },[contacts, filter]);

  const deleteContact = contactId => {
    setContacts(state => state.filter(({id}) => id !== contactId));
  };


    return (
      <Container>
        <TitleMain>Phonebook</TitleMain>
        <ContactForm 
          onSubmit={addContact}
        />

        <TitleSec>Contacts</TitleSec>
        <Filter value={filter} onChange={changeFilter}/>
        <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
      </Container>
    );
  
};

export default App;
