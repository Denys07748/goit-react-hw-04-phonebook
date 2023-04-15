import PropTypes from 'prop-types';
import { ContactsList } from './ContactList.styled';
import ContactListItem from './ContactListItem';

const ContactList = ({contacts, onDeleteContact}) => {
    return (
        <ContactsList>
            {contacts.map(({id, name, number}) => 
                <ContactListItem key={id} id={id} name={name} number={number} onDeleteContact={onDeleteContact}/>
            )}
        </ContactsList>
    )
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}