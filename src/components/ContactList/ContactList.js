import { useSelector, useDispatch } from 'react-redux';

import { getFilterValue, getContacts } from 'redux/selectors';
import { deleteContact } from 'redux/slicers';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const filteredContacts = contacts.items
    .filter(contact => {
      const nameMatch = contact.name
        ? contact.name.toLowerCase().includes(filter.toLowerCase())
        : false;
      const phoneMatch = contact.phone
        ? contact.phone.toLowerCase().includes(filter.toLowerCase())
        : false;
      return nameMatch || phoneMatch;
    })
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

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
