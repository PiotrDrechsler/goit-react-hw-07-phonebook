import { useSelector, useDispatch } from 'react-redux';

import {
  selectStatusFilter,
  selectContacts,
  selectIsLoading,
} from 'redux/selectors';

import { deleteContact } from 'redux/slicers';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectStatusFilter);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  const handleDelete = idToDelete => {
    dispatch(deleteContact(idToDelete));
  };

  return isLoading ? (
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
