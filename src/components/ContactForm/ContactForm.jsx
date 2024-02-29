// import css from './ContactForm.module';
import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberRegExp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const ContactSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .matches(nameRegExp, "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"),
    number: Yup.string()
    .min(3)
    .max(50, 'Too Long!')
    .required('Required')
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
            <Form className={css.form}>
                <div className={css.field}>
                    <label className={css.label} htmlFor={nameFieldId}>Name</label>
                    <Field type="text" name="name" id={nameFieldId} />
                </div>
                <ErrorMessage className={css.error} name="name" component="span" />

                <div className={css.field}>
                    <label className={css.label} htmlFor={numberFieldId}>Number</label>
                    <Field type="text" name="number" id={numberFieldId}/>
                </div>
                <ErrorMessage className={css.error} name="number" component="span" />
                <button type="submit">Add contact</button>
            </Form>
        </Formik>
    )
}