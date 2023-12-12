import React, { Component } from 'react';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './Filter';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const duplicateName = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (duplicateName) {
      alert(`${newContact.name} is already in your phonebook.`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default Phonebook;
