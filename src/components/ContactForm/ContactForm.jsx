// import css from './ContactForm.module';
import { nanoid } from 'nanoid';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberRegExp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const ContactSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Name is a required field')
    .matches(nameRegExp, "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"),
    number: Yup.string()
    .min(8)
    .max(30, 'Too Long!')
    .required('Number is a required field')
    .matches(numberRegExp, "Mobile phone number must have 8 digits"),
});

const initualValues = {
    name: '',
    number: '',
};

export default function ContactForm ({ onAdd }) {

    const nameFieldId = nanoid();
    const numberFieldId = nanoid();

    const handleSubmit = (values, actions) => {
        onAdd({
            id: nanoid(),
            name: values.name,
            number: values.number,
        });
        actions.resetForm();
    };

    return (
        <Formik 
            initialValues={initualValues}
            onSubmit={handleSubmit}
            validationSchema={ContactSchema}
        >
            <Form>
                <div>
                    <label htmlFor={nameFieldId}>Name</label>
                    <Field type="text" name="name" id={nameFieldId} />
                    <ErrorMessage name="name" component="span" />
                </div>

                <div>
                    <label htmlFor={numberFieldId}>Number</label>
                    <Field type="text" name="number" id={numberFieldId}/>
                    <ErrorMessage name="number" component="span" />
                </div>
                <button type="submit">Add contact</button>
            </Form>
        </Formik>
    )
}