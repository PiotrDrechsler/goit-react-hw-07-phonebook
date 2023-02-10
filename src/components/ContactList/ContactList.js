import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFilterValue, getContacts } from 'redux/selectors';
import { deleteContact } from 'redux/actions';
import { fetchContacts } from 'redux/reducer';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.items.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.replace(/-|\s/g, '').includes(filter.replace(/-|\s/g, ''))
  );

  const handleDelete = idToDelete => {
    dispatch(deleteContact(idToDelete));
  };

  return contacts.isLoading ? (
    <p>List is Loading! Please wait.</p>
  ) : filteredContacts.length > 0 ? (
    <>
      <ul>
        {filteredContacts.map(({ id, name, phone }) => {
          return (
            <li key={id}>
              {name}: {phone}
              <button type="submit" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <p>No contacts.</p>
  );
};

export default ContactList;
