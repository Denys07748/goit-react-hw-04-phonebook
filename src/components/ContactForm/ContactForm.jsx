import PropTypes from 'prop-types';
import { FormEl } from "./ContactForm.styled";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const { validName: { checkName, messageName }, validNum: { checkNum, messageNum } } = {
    validName: {
        checkName: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        messageName: 'Name may contain only letters',
    },
    validNum: {
        checkNum: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        messageNum: 'Phone number must be digits',
    },
}

const schema = yup.object().shape({
    name: yup.string().matches(checkName, messageName).required('Name is required'),
    number: yup.string().matches(checkNum, messageNum).required('Number is required'),
});

const initialValues = {
    name: '', 
    number: '',
};

const ContactForm = ({onSubmit}) => {
    const handleSubmit = (values, {resetForm}) => {

        onSubmit(values);
        resetForm();
    };

        return (
            <Formik initialValues={initialValues} 
                    validationSchema={schema} 
                    onSubmit={handleSubmit}>
                <FormEl>
                    <label htmlFor='name'>
                        Name<Field
                            type="text"
                            name="name"
                        />
                        <ErrorMessage name="name" component='div'/>
                    </label>
                    <label htmlFor='number'>
                        Number<Field
                            type="tel"
                            name="number"
                        />
                        <ErrorMessage name="number" component='div'/>
                    </label>
                    <button type='submit'>Add contact</button>
                </FormEl>
            </Formik>
        );
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};