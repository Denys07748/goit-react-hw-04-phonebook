import PropTypes from 'prop-types';
import { ContactEl } from './ContactList.styled';

const ContactListItem = ({id, name, number, onDeleteContact}) => {
    return (
        <ContactEl>
           <p>{name}: {number}</p>
           <button type='button' onClick={() => onDeleteContact(id)}>
            Delete
           </button>
        </ContactEl>
    )
};

export default ContactListItem;

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}