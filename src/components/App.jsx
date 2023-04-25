import React, { useEffect, useState, useRef } from 'react';
import AddContactForm from './AddContactForm/AddContactForm';
import { nanoid } from 'nanoid';
import { Title } from './Title/Title';
import { Contacts } from './Contacts/Contacts';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const checkContact = (arr, newName) => {
    return arr.some(({ name }) => {
      return newName.toLowerCase() === name.toLowerCase();
    });
  };

  const handleAddContact = ({ name, number }) => {
    const check = checkContact(contacts, name);
    if (check) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { id: nanoid(), name: name, number: number },
    ]);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const localContacts = () => {
    return JSON.parse(localStorage.getItem('PHONEBOOK_CONTACTS'));
  };

  useEffect(() => {
    if (!localContacts()) {
      // console.log(localContacts());
      setContacts([
        { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
        { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
        { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
        { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
      ]);
      // console.log('First render. Default contacts set.');
    } else {
      setContacts(localContacts());
      // console.log('First render. Contacts from storage set.');
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current === true) {
      // console.log('Skip first render');
      // console.log(localContacts());
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem('PHONEBOOK_CONTACTS', JSON.stringify(contacts));
    // console.log('Not a first render, contacts updated');
    // console.log(localContacts()); // Чому на другому рендері локальні контакти дорівнюють []?
  }, [contacts]);

  return (
    <>
      <Title title={'Phonebook'} />
      <AddContactForm addContact={handleAddContact} />
      <Title title={'Contacts'} />
      <Filter value={filter} onChange={handleFilterChange} />
      <Contacts
        contacts={contacts}
        filter={filter}
        onDeleteContact={handleDeleteContact}
      />
    </>
  );
};

export default App;
