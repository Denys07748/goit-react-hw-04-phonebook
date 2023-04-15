import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {Container, TitleMain, TitleSec} from './App.styled'
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevPors, prevState) {
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contactData => {
    const isIncludes = this.state.contacts.some(({name, number}) => name.toLowerCase() === contactData.name.toLowerCase() ||
      number === contactData.number); 
    if(isIncludes) {
      alert('A contact with the same name or number is already in contacts');
      return;
    }

    const newContact = {
      id: nanoid(5),
      ...contactData,
    }
  
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }))
  };

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value})
  };

  getVisibleContacts = () => {
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) => 
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({id}) => id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <TitleMain>Phonebook</TitleMain>
        <ContactForm 
          onSubmit={this.addContact}
        />

        <TitleSec>Contacts</TitleSec>
        <Filter value={this.state.filter} onChange={this.changeFilter}/>
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </Container>
    );
  }
  
};

export default App;
